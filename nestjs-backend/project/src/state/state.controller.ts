import { Controller } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}

  async createProjectState(): Promise<any> {
    return this.stateService.createProjectState();
  }

  async updateProjectState(): Promise<any> {
    return this.stateService.updateProjectState();
  }

  async removeProjectState(): Promise<any> {
    return this.stateService.removeProjectState();
  }

  async findProjectStates(): Promise<any> {
    return this.stateService.findProjectStates();
  }

  async findProjectStatesByCriteria(): Promise<any> {
    return this.stateService.findProjectStatesByCriteria();
  }
}
