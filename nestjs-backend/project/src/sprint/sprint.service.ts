import { Inject, Injectable } from '@nestjs/common';
import { CreateSprintDto } from 'src/dto/create-sprint.dto';
import { UpdateSprintDto } from 'src/dto/update-sprint.dto';
import { ProjectEntity } from 'src/entities/project.entity';
import { SprintEntity } from 'src/entities/sprint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SprintService {
  constructor(
    @Inject('SPRINT_REPOSITORY')
    private sprintRepository: Repository<SprintEntity>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async createProjectSprint(
    projectId: number,
    createSprintDto: CreateSprintDto,
  ): Promise<SprintEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const sprint = this.sprintRepository.create({
      ...createSprintDto,
      project,
    });

    return await this.sprintRepository.save(sprint);
  }

  async updateProjectSprint(
    sprintId: number,
    updateSprintDto: UpdateSprintDto,
  ): Promise<SprintEntity> {
    await this.sprintRepository.update(
      { sprint_id: sprintId },
      updateSprintDto,
    );

    return await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
    });
  }

  async removeProjectSprint(sprintId: number): Promise<SprintEntity> {
    const sprint = await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
    });

    return await this.sprintRepository.remove(sprint);
  }

  async findProjectSprints(projectId: number): Promise<SprintEntity[]> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.sprintRepository.find({
      where: {
        project,
      },
    });
  }

  async findProjectSprintByCriteria(sprintId: number): Promise<SprintEntity> {
    return await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
    });
  }
}
