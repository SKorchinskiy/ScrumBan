import { Inject, Injectable } from '@nestjs/common';
import { CreateStateDto } from 'src/dto/create-state.dto';
import { UpdateStateDto } from 'src/dto/update-state.dto';
import { ProjectEntity } from 'src/entities/project.entity';
import { StateEntity } from 'src/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @Inject('STATE_REPOSITORY')
    private stateRepository: Repository<StateEntity>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async createProjectState(
    projectId: number,
    createStateDto: CreateStateDto,
  ): Promise<StateEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const state = await this.stateRepository.create({
      ...createStateDto,
      project,
    });

    return await this.stateRepository.save(state);
  }

  async updateProjectState(
    stateId: number,
    updateStateDto: UpdateStateDto,
  ): Promise<StateEntity> {
    await this.stateRepository.update({ state_id: stateId }, updateStateDto);

    return await this.stateRepository.findOne({
      where: {
        state_id: stateId,
      },
    });
  }

  async removeProjectState(stateId: number): Promise<StateEntity> {
    const state = await this.stateRepository.findOne({
      where: {
        state_id: stateId,
      },
    });

    return await this.stateRepository.remove(state);
  }

  async findProjectStates(projectId: number): Promise<StateEntity[]> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.stateRepository.find({
      where: {
        project,
      },
    });
  }

  async findProjectStateByCriteria(stateId: number): Promise<StateEntity> {
    return await this.stateRepository.findOne({
      where: {
        state_id: stateId,
      },
    });
  }
}
