import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post()
  async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto) {
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
  async findUserWorkspaces(@Body('userId') userId: number) {
    return await this.workspaceService.findUserWorkspaces(userId);
  }

  @Delete(':workspaceId')
  async removeUserWorkspace(@Param('workspaceId') workspaceId: number) {
    return await this.workspaceService.removeUserWorkspace(workspaceId);
  }
}
