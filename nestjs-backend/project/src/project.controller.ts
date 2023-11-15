import { Controller } from '@nestjs/common';
import { ProjectService } from './project.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern({ cmd: 'create_project' })
  async createProject(
    @Payload()
    payload: {
      workspaceId: number;
      createProjectDto: CreateProjectDto;
    },
  ): Promise<ProjectEntity> {
    return await this.projectService.createProject(
      payload.workspaceId,
      payload.createProjectDto,
    );
  }

  @MessagePattern({ cmd: 'update_project' })
  async updateProject(
    @Payload()
    payload: {
      workspaceId: number;
      projectId: number;
      updateProjectDto: UpdateProjectDto;
    },
  ): Promise<ProjectEntity> {
    return await this.projectService.updateProject(
      payload.workspaceId,
      payload.projectId,
      payload.updateProjectDto,
    );
  }

  @MessagePattern({ cmd: 'remove_project' })
  async removeProject(
    @Payload() payload: { workspaceId: number; projectId: number },
  ): Promise<ProjectEntity> {
    return await this.projectService.removeProject(
      payload.workspaceId,
      payload.projectId,
    );
  }

  @MessagePattern({ cmd: 'find_projects' })
  async findWorkspaceProjects(
    @Payload() payload: { workspaceId: number },
  ): Promise<ProjectEntity[]> {
    return await this.projectService.findWorkspaceProjects(payload.workspaceId);
  }

  @MessagePattern({ cmd: 'find_project_by' })
  async findWorkspaceProjectByCriteria(
    @Payload() payload: { workspaceId: number; projectId: number },
  ): Promise<ProjectEntity> {
    return await this.projectService.findWorkspaceProjectByCriteria(
      payload.workspaceId,
      payload.projectId,
    );
  }
}
