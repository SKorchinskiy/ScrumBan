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
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueService } from './issue.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workspaces/:workspaceId')
@UseGuards(AuthGuard)
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get('issues')
  async getWorkspaceIssues(@Param('workspaceId') workspaceId: number) {
    return await this.issueService.getWorkspaceIssues(workspaceId);
  }

  @Post('projects/:projectId/issues/:issueId/members/:memberId')
  async addIssueAssignee(
    @Param('issueId') issueId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.issueService.addIssueAssignee(issueId, memberId);
  }

  @Delete('projects/:projectId/issues/:issueId/members/:memberId')
  async removeIssueAssignee(
    @Param('issueId') issueId: number,
    @Param('memberId') memberId: number,
  ) {
    return await this.issueService.removeIssueAssignee(issueId, memberId);
  }

  @Post('projects/:projectId/issues/:issueId/labels/:labelId')
  async addIssueLabel(
    @Param('issueId') issueId: number,
    @Param('labelId') labelId: number,
  ) {
    return await this.issueService.addIssueLabel(issueId, labelId);
  }

  @Delete('projects/:projectId/issues/:issueId/labels/:labelId')
  async removeIssueLabel(
    @Param('issueId') issueId: number,
    @Param('labelId') labelId: number,
  ) {
    return await this.issueService.removeIssueLabel(issueId, labelId);
  }

  @Post('projects/:projectId/issues')
  async createProjectIssue(
    @Param('projectId') projectId: number,
    @Body() createIssueDto: CreateIssueDto,
  ) {
    return await this.issueService.createProjectIssue(
      projectId,
      createIssueDto,
    );
  }

  @Put('issues/:issueId')
  async updateIssue(
    @Param('issueId') issueId: number,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return await this.issueService.updateProjectIssue(issueId, updateIssueDto);
  }

  @Put('projects/:projectId/issues/:issueId')
  async updateProjectIssue(
    @Param('issueId') issueId: number,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return await this.issueService.updateProjectIssue(issueId, updateIssueDto);
  }

  @Get('projects/:projectId/issues/:issueId')
  async findProjectIssueByCriteria(@Param('issueId') issueId: number) {
    return await this.issueService.findProjectIssueByCriteria(issueId);
  }

  @Get('projects/:projectId/issues')
  async findProjectIssues(@Param('projectId') projectId: number) {
    return await this.issueService.findProjectIssues(projectId);
  }

  @Delete('issues/:issueId')
  async removeIssue(@Param('issueId') issueId: number) {
    return await this.issueService.removeProjectIssue(issueId);
  }

  @Delete('projects/:projectId/issues/:issueId')
  async removeProjectIssue(@Param('issueId') issueId: number) {
    return await this.issueService.removeProjectIssue(issueId);
  }
}
