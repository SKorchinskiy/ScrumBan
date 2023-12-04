import { Inject, Injectable } from '@nestjs/common';
import { CreateStateDto } from 'src/dto/create-state.dto';
import { UpdateStateDto } from 'src/dto/update-state.dto';
import { StateEntity } from 'src/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @Inject('STATE_REPOSITORY')
    private stateRepository: Repository<StateEntity>,
  ) {}

  async createWorkspaceState(
    workspaceId: number,
    createStateDto: CreateStateDto,
  ): Promise<StateEntity> {
    const state = await this.stateRepository.create({
      ...createStateDto,
      workspace_id: workspaceId,
    });

    return await this.stateRepository.save(state);
  }

  async updateWorkspaceState(
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

  async removeWorkspaceState(stateId: number): Promise<StateEntity> {
    const state = await this.stateRepository.findOne({
      where: {
        state_id: stateId,
      },
    });

    return await this.stateRepository.remove(state);
  }

  async findWorkspaceStates(workspaceId: number): Promise<StateEntity[]> {
    return await this.stateRepository.find({
      where: {
        workspace_id: workspaceId,
      },
    });
  }

  async findWorkspaceStateByCriteria(stateId: number): Promise<StateEntity> {
    return await this.stateRepository.findOne({
      where: {
        state_id: stateId,
      },
    });
  }
}
