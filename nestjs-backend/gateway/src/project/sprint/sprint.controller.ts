import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workspaces/:workspaceId/projects/:projectId/sprints')
@UseGuards(AuthGuard)
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @Post(':sprintId/issues/:issueId')
  async addIssueToProjectSprint(
    @Param('issueId') issueId: number,
    @Param('sprintId') sprintId: number,
  ) {
    return await this.sprintService.addIssueToProjectSprint(issueId, sprintId);
  }

  @Delete(':sprintId/issues/:issueId')
  async removeIssueFromProjectSprint(
    @Param('issueId') issueId: number,
    @Param('sprintId') sprintId: number,
  ) {
    return await this.sprintService.removeIssueFromProjectSprint(
      issueId,
      sprintId,
    );
  }

  @Post()
  async createProjectSprint(
    @Param('projectId') projectId: number,
    @Body() createSprintDto: CreateSprintDto,
  ) {
    return await this.sprintService.createProjectSprint(
      projectId,
      createSprintDto,
    );
  }

  @Put(':sprintId')
  async updateProjectSprint(
    @Param('sprintId') sprintId: number,
    @Body() updateSprintDto: UpdateSprintDto,
  ) {
    return await this.sprintService.updateProjectSprint(
      sprintId,
      updateSprintDto,
    );
  }

  @Delete(':sprintId')
  async removeProjectSprint(@Param('sprintId') sprintId: number) {
    return await this.sprintService.removeProjectSprint(sprintId);
  }

  @Get()
  async findProjectSprints(@Param('projectId') projectId: number) {
    return await this.sprintService.findProjectSprints(projectId);
  }

  @Get(':sprintId')
  async findProjectSprintByCriteria(@Param('sprintId') sprintId: number) {
    return await this.sprintService.findProjectSprintByCriteria(sprintId);
  }
}
