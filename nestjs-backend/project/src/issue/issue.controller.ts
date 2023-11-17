import { Controller } from '@nestjs/common';
import { IssueService } from './issue.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateIssueDto } from 'src/dto/create-issue.dto';
import { UpdateIssueDto } from 'src/dto/update-issue.dto';
import { IssueEntity } from 'src/entities/issue.entity';

@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @MessagePattern({
    cmd: 'create_project_issue',
  })
  async createProjectIssue(
    @Payload() payload: { projectId: number; createIssueDto: CreateIssueDto },
  ): Promise<IssueEntity> {
    return await this.issueService.createProjectIssue(
      payload.projectId,
      payload.createIssueDto,
    );
  }

  @MessagePattern({
    cmd: 'update_project_issue',
  })
  async updateProjectIssue(
    @Payload() payload: { issueId: number; updateIssueDto: UpdateIssueDto },
  ): Promise<IssueEntity> {
    return await this.issueService.updateProjectIssue(
      payload.issueId,
      payload.updateIssueDto,
    );
  }

  @MessagePattern({
    cmd: 'remove_project_issue',
  })
  async removeProjectIssue(
    @Payload() payload: { issueId: number },
  ): Promise<IssueEntity> {
    return this.issueService.removeProjectIssue(payload.issueId);
  }

  @MessagePattern({
    cmd: 'find_project_issues',
  })
  async findProjectIssues(
    @Payload() payload: { projectId: number },
  ): Promise<IssueEntity[]> {
    return this.issueService.findProjectIssues(payload.projectId);
  }

  @MessagePattern({
    cmd: 'find_project_issue_by',
  })
  async findProjectIssueByCriteria(
    @Payload() payload: { issueId: number },
  ): Promise<IssueEntity> {
    return this.issueService.findProjectIssueByCriteria(payload.issueId);
  }

  @MessagePattern({
    cmd: 'add_issue_assignee',
  })
  async addIssueAssignee(
    @Payload() payload: { issueId: number; memberId: number },
  ): Promise<IssueEntity> {
    return this.issueService.addIssueAssignee(
      payload.issueId,
      payload.memberId,
    );
  }

  @MessagePattern({
    cmd: 'remove_issue_assignee',
  })
  async removeIssueAssignee(
    @Payload() payload: { issueId: number; memberId: number },
  ): Promise<IssueEntity> {
    return this.issueService.removeIssueAssignee(
      payload.issueId,
      payload.memberId,
    );
  }

  @MessagePattern({
    cmd: 'add_issue_label',
  })
  async addIssueLabel(
    @Payload() payload: { issueId: number; labelId: number },
  ) {
    return this.issueService.addIssueLabel(payload.issueId, payload.labelId);
  }

  @MessagePattern({
    cmd: 'remove_issue_label',
  })
  async removeIssueLabel(
    @Payload() payload: { issueId: number; labelId: number },
  ) {
    return this.issueService.removeIssueLabel(payload.issueId, payload.labelId);
  }
}
