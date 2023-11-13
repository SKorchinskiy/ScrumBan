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
    @Payload() payload: CreateProjectDto,
  ): Promise<ProjectEntity> {
    return await this.projectService.createProject(payload);
  }

  @MessagePattern({ cmd: 'update_project' })
  async updateProject(
    @Payload()
    payload: {
      projectId: number;
      updateProjectDto: UpdateProjectDto;
    },
  ): Promise<ProjectEntity> {
    return await this.projectService.updateProject(
      payload.projectId,
      payload.updateProjectDto,
    );
  }

  @MessagePattern({ cmd: 'remove_project' })
  async removeProject(
    @Payload() payload: { projectId: number },
  ): Promise<ProjectEntity> {
    return await this.projectService.removeProject(payload.projectId);
  }

  @MessagePattern({ cmd: 'find_projects' })
  async findProjects(): Promise<ProjectEntity[]> {
    return await this.projectService.findProjects();
  }

  @MessagePattern({ cmd: 'find_project_by' })
  async findProjectByCriteria(
    @Payload() payload: { projectId: number },
  ): Promise<ProjectEntity> {
    return await this.projectService.findProjectByCriteria(payload.projectId);
  }
}
