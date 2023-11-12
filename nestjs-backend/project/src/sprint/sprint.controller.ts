import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SprintService } from './sprint.service';

@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @MessagePattern({ cmd: 'create_project_sprint' })
  async createProjectSprint(): Promise<any> {
    return this.sprintService.createProjectSprint();
  }

  @MessagePattern({ cmd: 'update_project_sprint' })
  async updateProjectSprint(): Promise<any> {
    return this.sprintService.updateProjectSprint();
  }

  @MessagePattern({ cnd: 'remove_project_sprint' })
  async removeProjectSprint(): Promise<any> {
    return this.sprintService.removeProjectSprint();
  }

  @MessagePattern({ cmd: 'find_project_sprints' })
  async findProjectSprints(): Promise<any> {
    return this.sprintService.findProjectSprints();
  }

  @MessagePattern({ cmd: 'find_project_sprint_by' })
  async findProjectSprintByCriteria(): Promise<any> {
    return this.sprintService.findProjectSprintByCriteria();
  }
}
