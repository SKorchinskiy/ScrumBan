import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StateService {
  constructor(@Inject('PROJECT') private projectMicroservice: ClientProxy) {}

  async createProjectState(projectId: number, createStateDto: CreateStateDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_project_state',
        },
        {
          projectId,
          createStateDto,
        },
      ),
    );
  }

  async updateProjectState(stateId: number, updateStateDto: UpdateStateDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'update_project_state',
        },
        {
          stateId,
          updateStateDto,
        },
      ),
    );
  }

  async removeProjectState(stateId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_project_state',
        },
        {
          stateId,
        },
      ),
    );
  }

  async findProjectStates(projectId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_states',
        },
        {
          projectId,
        },
      ),
    );
  }

  async findProjectStateByCriteria(stateId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_state_by',
        },
        {
          stateId,
        },
      ),
    );
  }
}
