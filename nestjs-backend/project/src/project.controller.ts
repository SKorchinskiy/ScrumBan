import { Controller } from '@nestjs/common';
import { ProjectService } from './project.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern({ cmd: 'create_project' })
  async createProject(): Promise<any> {
    return await this.projectService.createProject();
  }

  @MessagePattern({ cmd: 'update_project' })
  async updateProject(): Promise<any> {
    return await this.projectService.updateProject();
  }

  @MessagePattern({ cmd: 'remove_project' })
  async removeProject(): Promise<any> {
    return await this.projectService.removeProject();
  }

  @MessagePattern({ cmd: 'find_projects' })
  async findProjects(): Promise<any> {
    return await this.projectService.findProjects();
  }

  @MessagePattern({ cmd: 'find_project_by' })
  async findProjectByCriteria(): Promise<any> {
    return await this.projectService.findProjectByCriteria();
  }
}
