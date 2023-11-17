import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from 'src/dto/create-sprint.dto';
import { UpdateSprintDto } from 'src/dto/update-sprint.dto';
import { SprintEntity } from 'src/entities/sprint.entity';

@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @MessagePattern({ cmd: 'create_project_sprint' })
  async createProjectSprint(
    @Payload() payload: { projectId: number; createSprintDto: CreateSprintDto },
  ): Promise<SprintEntity> {
    return this.sprintService.createProjectSprint(
      payload.projectId,
      payload.createSprintDto,
    );
  }

  @MessagePattern({ cmd: 'update_project_sprint' })
  async updateProjectSprint(
    @Payload() payload: { sprintId: number; updateSprintDto: UpdateSprintDto },
  ): Promise<SprintEntity> {
    return this.sprintService.updateProjectSprint(
      payload.sprintId,
      payload.updateSprintDto,
    );
  }

  @MessagePattern({ cnd: 'remove_project_sprint' })
  async removeProjectSprint(
    @Payload() payload: { sprintId: number },
  ): Promise<SprintEntity> {
    return this.sprintService.removeProjectSprint(payload.sprintId);
  }

  @MessagePattern({ cmd: 'find_project_sprints' })
  async findProjectSprints(
    @Payload() payload: { projectId: number },
  ): Promise<SprintEntity[]> {
    return this.sprintService.findProjectSprints(payload.projectId);
  }

  @MessagePattern({ cmd: 'find_project_sprint_by' })
  async findProjectSprintByCriteria(
    @Payload() payload: { sprintId: number },
  ): Promise<SprintEntity> {
    return this.sprintService.findProjectSprintByCriteria(payload.sprintId);
  }

  @MessagePattern({ cmd: 'add_issue_to_project_sprint' })
  async addIssueToProjectSprint(
    @Payload() payload: { issueId: number; sprintId: number },
  ): Promise<SprintEntity> {
    return this.sprintService.addIssueToProjectSprint(
      payload.issueId,
      payload.sprintId,
    );
  }

  @MessagePattern({ cmd: 'remove_issue_from_project_sprint' })
  async removeIssueFromProjectSprint(
    @Payload() payload: { issueId: number; sprintId: number },
  ): Promise<SprintEntity> {
    return this.sprintService.removeIssueFromProjectSprint(
      payload.issueId,
      payload.sprintId,
    );
  }
}
