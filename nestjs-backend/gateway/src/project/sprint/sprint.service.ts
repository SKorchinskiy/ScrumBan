import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class SprintService {
  constructor(@Inject('PROJECT') private projectMicroservice: ClientProxy) {}

  async createProjectSprint(
    projectId: number,
    createSprintDto: CreateSprintDto,
  ) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_project_sprint',
        },
        {
          projectId,
          createSprintDto,
        },
      ),
    );
  }

  async updateProjectSprint(
    sprintId: number,
    updateSprintDto: UpdateSprintDto,
  ) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'update_project_sprint',
        },
        {
          sprintId,
          updateSprintDto,
        },
      ),
    );
  }

  async removeProjectSprint(sprintId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_project_sprint',
        },
        {
          sprintId,
        },
      ),
    );
  }

  async findProjectSprints(projectId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_sprints',
        },
        {
          projectId,
        },
      ),
    );
  }

  async findProjectSprintByCriteria(sprintId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_sprint_by',
        },
        {
          sprintId,
        },
      ),
    );
  }

  async addIssueToProjectSprint(issueId: number, sprintId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'add_issue_to_project_sprint',
        },
        {
          issueId,
          sprintId,
        },
      ),
    );
  }

  async removeIssueFromProjectSprint(issueId: number, sprintId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_issue_from_project_sprint',
        },
        {
          issueId,
          sprintId,
        },
      ),
    );
  }
}
