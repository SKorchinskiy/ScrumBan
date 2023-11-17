import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueService } from './issue.service';

@Controller('workspaces/:workspaceId/projects/:projectId/issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post(':issueId/members/:memberId')
  async addIssueAssignee(
    @Param('issueId') issueId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.issueService.addIssueAssignee(issueId, memberId);
  }

  @Delete(':issueId/members/:memberId')
  async removeIssueAssignee(
    @Param('issueId') issueId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.issueService.removeIssueAssignee(issueId, memberId);
  }

  @Post(':issueId/labels/:labelId')
  async addIssueLabel(
    @Param('issueId') issueId: number,
    @Param('labelId') labelId: number,
  ) {
    return await this.issueService.addIssueLabel(issueId, labelId);
  }

  @Delete(':issueId/labels/:labelId')
  async removeIssueLabel(
    @Param('issueId') issueId: number,
    @Param('labelId') labelId: number,
  ) {
    return await this.issueService.removeIssueLabel(issueId, labelId);
  }

  @Post()
  async createProjectIssue(
    @Param('projectId') projectId: number,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    return await this.issueService.createProjectIssue(
      projectId,
      createIssueDto,
    );
  }

  @Put(':issueId')
  async updateProjectIssue(
    @Param('issueId') issueId: number,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return await this.issueService.updateProjectIssue(issueId, updateIssueDto);
  }

  @Get(':issueId')
  async findProjectIssueByCriteria(@Param('issueId') issueId: number) {
    return await this.issueService.findProjectIssueByCriteria(issueId);
  }

  @Get()
  async findProjectIssues(@Param('projectId') projectId: number) {
    return await this.issueService.findProjectIssues(projectId);
  }

  @Delete(':issueId')
  async removeProjectIssue(@Param('issueId') issueId: number) {
    return await this.issueService.removeProjectIssue(issueId);
  }
}
