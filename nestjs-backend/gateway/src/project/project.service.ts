import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT') private readonly projectMicroservice: ClientProxy,
  ) {}

  async createProject(workspaceId: number, createProjectDto: CreateProjectDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_project',
        },
        {
          workspaceId,
          createProjectDto,
        },
      ),
    );
  }

  async updateProject(
    workspaceId: number,
    projectId: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'update_project',
        },
        {
          workspaceId,
          projectId,
          updateProjectDto,
        },
      ),
    );
  }

  async findProjects(workspaceId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_projects',
        },
        {
          workspaceId,
        },
      ),
    );
  }

  async findProjectByCriteria(workspaceId: number, projectId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_by',
        },
        {
          workspaceId,
          projectId,
        },
      ),
    );
  }

  async removeProject(workspaceId: number, projectId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_project',
        },
        {
          workspaceId,
          projectId,
        },
      ),
    );
  }
}
