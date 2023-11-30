import { Controller } from '@nestjs/common';
import { StateService } from './state.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStateDto } from 'src/dto/create-state.dto';
import { UpdateStateDto } from 'src/dto/update-state.dto';
import { StateEntity } from 'src/entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}

  @MessagePattern({ cmd: 'create_workspace_state' })
  async createWorkspaceState(
    @Payload() payload: { workspaceId: number; createStateDto: CreateStateDto },
  ): Promise<StateEntity> {
    return this.stateService.createWorkspaceState(
      payload.workspaceId,
      payload.createStateDto,
    );
  }

  @MessagePattern({ cmd: 'update_workspace_state' })
  async updateWorkspaceState(
    @Payload() payload: { stateId: number; updateStateDto: UpdateStateDto },
  ): Promise<StateEntity> {
    return this.stateService.updateWorkspaceState(
      payload.stateId,
      payload.updateStateDto,
    );
  }

  @MessagePattern({ cmd: 'remove_workspace_state' })
  async removeWorkspaceState(
    @Payload() payload: { stateId: number },
  ): Promise<StateEntity> {
    return this.stateService.removeWorkspaceState(payload.stateId);
  }

  @MessagePattern({ cmd: 'find_workspace_states' })
  async findWorkspaceStates(
    @Payload() payload: { workspaceId: number },
  ): Promise<StateEntity[]> {
    return this.stateService.findWorkspaceStates(payload.workspaceId);
  }

  @MessagePattern({ cmd: 'find_workspace_state_by' })
  async findWorkspaceStateByCriteria(
    @Payload() payload: { stateId: number },
  ): Promise<StateEntity> {
    return this.stateService.findWorkspaceStateByCriteria(payload.stateId);
  }
}
