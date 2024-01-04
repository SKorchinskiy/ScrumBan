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
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { StatsDto } from 'src/dto/get-stats.dto';
import { UpdateStatsDto } from 'src/dto/update-stats.dto';
import { CreateStatsDto } from 'src/dto/create-stats.dto';

@Controller('workspaces')
@UseGuards(AuthGuard)
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Get(':workspaceId/stats/:limit')
  async getActionStats(
    @Param('workspaceId') workspaceId: number,
    @Param('limit') limit: number,
  ) {
    return await this.workspaceService.getActionStats({
      workspaceId,
      limit,
    });
  }

  @Post(':workspaceId/stats')
  async createActionStats(
    @Param('workspaceId') workspaceId: number,
    @Body() createStatsDto: CreateStatsDto,
  ) {
    return await this.workspaceService.createActionStats({
      ...createStatsDto,
      workspaceId,
    });
  }

  @Put(':workspaceId/stats')
  async increaseActionStats(
    @Param('workspaceId') workspaceId: number,
    @Body() updateStatsDto: UpdateStatsDto,
  ) {
    return await this.workspaceService.increaseActionStats({
      ...updateStatsDto,
      workspaceId,
    });
  }

  @Post()
  async createWorkspace(
    @User() user: any,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    createWorkspaceDto.workspace_owner = user.user_id;
    return await this.workspaceService.createWorkspace(createWorkspaceDto);
  }

  @Put(':workspaceId')
  async updateWorkspace(
    @Param('workspaceId') workspaceId: number,
    @Body()
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return await this.workspaceService.updateWorkspace(
      workspaceId,
      updateWorkspaceDto,
    );
  }

  @Get(':workspaceId')
  async findUserWorkspaceByCriteria(@Param('workspaceId') workspaceId: number) {
    return await this.workspaceService.findUserWorkspaceByCriteria(workspaceId);
  }

  @Get()
  async findUserWorkspaces(@User() user: any) {
    return await this.workspaceService.findUserWorkspaces(user.user_id);
  }

  @Delete(':workspaceId')
  async removeUserWorkspace(@Param('workspaceId') workspaceId: number) {
    return await this.workspaceService.removeUserWorkspace(workspaceId);
  }
}
