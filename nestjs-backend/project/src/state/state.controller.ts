import { Controller } from '@nestjs/common';
import { StateService } from './state.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStateDto } from 'src/dto/create-state.dto';
import { UpdateStateDto } from 'src/dto/update-state.dto';
import { StateEntity } from 'src/entities/state.entity';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}

  @MessagePattern({ cmd: 'create_project_state' })
  async createProjectState(
    @Payload() payload: { projectId: number; createStateDto: CreateStateDto },
  ): Promise<StateEntity> {
    return this.stateService.createProjectState(
      payload.projectId,
      payload.createStateDto,
    );
  }

  @MessagePattern({ cmd: 'update_project_state' })
  async updateProjectState(
    @Payload() payload: { stateId: number; updateStateDto: UpdateStateDto },
  ): Promise<StateEntity> {
    return this.stateService.updateProjectState(
      payload.stateId,
      payload.updateStateDto,
    );
  }

  @MessagePattern({ cmd: 'remove_project_state' })
  async removeProjectState(
    @Payload() payload: { stateId: number },
  ): Promise<StateEntity> {
    return this.stateService.removeProjectState(payload.stateId);
  }

  @MessagePattern({ cmd: 'find_project_states' })
  async findProjectStates(
    @Payload() payload: { projectId: number },
  ): Promise<StateEntity[]> {
    return this.stateService.findProjectStates(payload.projectId);
  }

  @MessagePattern({ cmd: 'find_project_state_by' })
  async findProjectStateByCriteria(
    @Payload() payload: { stateId: number },
  ): Promise<StateEntity> {
    return this.stateService.findProjectStateByCriteria(payload.stateId);
  }
}
