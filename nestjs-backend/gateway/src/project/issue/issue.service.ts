import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class IssueService {
  constructor(@Inject('PROJECT') private projectMicroservice: ClientProxy) {}

  async getWorkspaceIssues(workspaceId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'get_workspace_issues',
        },
        {
          workspaceId,
        },
      ),
    );
  }

  async createProjectIssue(projectId: number, createIssueDto: CreateIssueDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_project_issue',
        },
        {
          projectId,
          createIssueDto,
        },
      ),
    );
  }

  async updateProjectIssue(issueId: number, updateIssueDto: UpdateIssueDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'update_project_issue',
        },
        {
          issueId,
          updateIssueDto,
        },
      ),
    );
  }

  async removeProjectIssue(issueId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_project_issue',
        },
        {
          issueId,
        },
      ),
    );
  }

  async findProjectIssues(projectId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_issues',
        },
        {
          projectId,
        },
      ),
    );
  }

  async findProjectIssueByCriteria(issueId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_issue_by',
        },
        {
          issueId,
        },
      ),
    );
  }

  async addIssueAssignee(issueId: number, memberId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'add_issue_assignee',
        },
        {
          issueId,
          memberId,
        },
      ),
    );
  }

  async removeIssueAssignee(issueId: number, memberId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_issue_assignee',
        },
        {
          issueId,
          memberId,
        },
      ),
    );
  }

  async addIssueLabel(issueId: number, labelId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'add_issue_label',
        },
        {
          issueId,
          labelId,
        },
      ),
    );
  }

  async removeIssueLabel(issueId: number, labelId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_issue_label',
        },
        {
          issueId,
          labelId,
        },
      ),
    );
  }
}
