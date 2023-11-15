import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject('WORKSPACE') private workspaceMicroservice: ClientProxy,
  ) {}

  async createWorkspace(createWorkspaceDto: CreateWorkspaceDto) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'create_workspace',
        },
        {
          createWorkspaceDto,
        },
      ),
    );
  }

  async updateWorkspace(
    workspaceId: number,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'update_workspace',
        },
        {
          workspaceId,
          updateWorkspaceDto,
        },
      ),
    );
  }

  async findUserWorkspaces(user_id: number) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'find_workspaces',
        },
        {
          user_id,
        },
      ),
    );
  }

  async findUserWorkspaceByCriteria(workspaceId: number) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'find_workspace_by',
        },
        {
          workspaceId,
        },
      ),
    );
  }

  async removeUserWorkspace(workspaceId: number) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'remove_workspace',
        },
        {
          workspaceId,
        },
      ),
    );
  }
}
