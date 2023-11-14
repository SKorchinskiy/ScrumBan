import { Controller } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller()
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @MessagePattern({ cmd: 'create_workspace' })
  async createWorkspace(
    @Payload() payload: { createWorkspaceDto: CreateWorkspaceDto },
  ) {
    return await this.workspaceService.createWorkspace(
      payload.createWorkspaceDto,
    );
  }

  @MessagePattern({ cmd: 'update_workspace' })
  async updateWorkspace(
    @Payload()
    payload: {
      workspaceId: number;
      updateWorkspaceDto: UpdateWorkspaceDto;
    },
  ) {
    return await this.workspaceService.updateWorkspace(
      payload.workspaceId,
      payload.updateWorkspaceDto,
    );
  }

  @MessagePattern({ cmd: 'find_workspaces' })
  async findUserWorkspaces(@Payload() payload: { user_id: number }) {
    return await this.workspaceService.findUserWorkspaces(payload.user_id);
  }

  @MessagePattern({ cmd: 'find_workspace_by' })
  async findUserWorkspaceByCriteria(
    @Payload() payload: { workspaceId: number },
  ) {
    return await this.workspaceService.findUserWorkspaceByCriteria(
      payload.workspaceId,
    );
  }
}
