import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MemberEntity } from './entities/member.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
    @Inject('MEMBER_REPOSITORY')
    private memberRepository: Repository<MemberEntity>,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    const { project_owner_id, ...restParams } = createProjectDto;
    const owner = this.memberRepository.create({
      user_id: project_owner_id,
      role: 'admin',
    });
    const projectEntity = this.projectRepository.create({
      ...restParams,
      project_owner: owner,
    });
    const project = await this.projectRepository.save(projectEntity);

    owner.project = project;
    await this.memberRepository.save(owner);
    return project;
  }

  async updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    await this.projectRepository.update(
      { project_id: projectId },
      updateProjectDto,
    );
    return await this.findProjectByCriteria(projectId);
  }

  async removeProject(projectId: number): Promise<ProjectEntity> {
    const project = await this.findProjectByCriteria(projectId);
    return await this.projectRepository.remove(project);
  }

  async findProjects(): Promise<ProjectEntity[]> {
    return await this.projectRepository.find();
  }

  async findProjectByCriteria(projectId: number): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });
  }
}
