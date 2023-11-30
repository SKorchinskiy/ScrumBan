import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StateService {
  constructor(@Inject('PROJECT') private projectMicroservice: ClientProxy) {}

  async createWorkspaceState(
    workspaceId: number,
    createStateDto: CreateStateDto,
  ) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_workspace_state',
        },
        {
          workspaceId,
          createStateDto,
        },
      ),
    );
  }

  async updateWorkspaceState(stateId: number, updateStateDto: UpdateStateDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'update_workspace_state',
        },
        {
          stateId,
          updateStateDto,
        },
      ),
    );
  }

  async removeWorkspaceState(stateId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_workspace_state',
        },
        {
          stateId,
        },
      ),
    );
  }

  async findWorkspaceStates(workspaceId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_workspace_states',
        },
        {
          workspaceId,
        },
      ),
    );
  }

  async findWorkspaceStateByCriteria(stateId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_workspace_state_by',
        },
        {
          stateId,
        },
      ),
    );
  }
}
