import { Controller } from '@nestjs/common';
import { IssueService } from './issue.service';

@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  async createProjectIssue(): Promise<any> {
    return this.issueService.addIssueAssignee();
  }

  async updateProjectIssue(): Promise<any> {
    return this.issueService.updateProjectIssue();
  }

  async removeProjectIssue(): Promise<any> {
    return this.issueService.removeProjectIssue();
  }

  async findProjectIssues(): Promise<any> {
    return this.issueService.findProjectIssues();
  }

  async findProjectIssuesByCriteria(): Promise<any> {
    return this.issueService.findProjectIssuesByCriteria();
  }

  async addIssueAssignee(): Promise<any> {
    return this.issueService.addIssueAssignee();
  }

  async removeIssueAssignee(): Promise<any> {
    return this.issueService.removeIssueAssignee();
  }
}
