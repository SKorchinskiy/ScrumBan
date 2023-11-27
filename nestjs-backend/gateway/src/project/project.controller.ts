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
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workspaces/:workspaceId/projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  async createProject(
    @Param('workspaceId') workspaceId: number,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.createProject(
      workspaceId,
      createProjectDto,
    );
  }

  @Put(':projectId')
  async updateProject(
    @Param('workspaceId') workspaceId: number,
    @Param('projectId') projectId: number,
    @Body()
    updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(
      workspaceId,
      projectId,
      updateProjectDto,
    );
  }

  @Get(':projectId')
  async findProjectByCriteria(
    @Param('workspaceId') workspaceId: number,
    @Param('projectId') projectId: number,
  ) {
    return await this.projectService.findProjectByCriteria(
      workspaceId,
      projectId,
    );
  }

  @Get()
  async findProjects(@Param('workspaceId') workspaceId: number) {
    return await this.projectService.findProjects(workspaceId);
  }

  @Delete(':projectId')
  async removeProject(
    @Param('workspaceId') workspaceId: number,
    @Param('projectId') projectId: number,
  ) {
    return await this.projectService.removeProject(workspaceId, projectId);
  }
}
