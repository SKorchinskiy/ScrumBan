import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async createProject(
    workspaceId: number,
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    const projectEntity = this.projectRepository.create({
      ...createProjectDto,
      workspace_id: workspaceId,
    });

    return await this.projectRepository.save(projectEntity);
  }

  async updateProject(
    workspaceId: number,
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    await this.projectRepository.update(
      { project_id: projectId },
      updateProjectDto,
    );

    return await this.projectRepository.findOne({
      where: {
        workspace_id: workspaceId,
        project_id: projectId,
      },
    });
  }

  async removeProject(
    workspaceId: number,
    projectId: number,
  ): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        workspace_id: workspaceId,
        project_id: projectId,
      },
    });
    return await this.projectRepository.remove(project);
  }

  async findWorkspaceProjects(workspaceId: number): Promise<ProjectEntity[]> {
    return await this.projectRepository.find({
      where: {
        workspace_id: workspaceId,
      },
    });
  }

  async findWorkspaceProjectByCriteria(
    workspaceId: number,
    projectId: number,
  ): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({
      where: {
        workspace_id: workspaceId,
        project_id: projectId,
      },
    });
  }
}
