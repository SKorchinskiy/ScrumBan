import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { StatsDto } from 'src/dto/get-stats.dto';
import { CreateStatsDto } from 'src/dto/create-stats.dto';
import { UpdateStatsDto } from 'src/dto/update-stats.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject('WORKSPACE') private workspaceMicroservice: ClientProxy,
  ) {}

  async getActionStats(statsDto: StatsDto) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'get_action_stats',
        },
        {
          statsDto,
        },
      ),
    );
  }

  async createActionStats(createStatsDto: CreateStatsDto) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'create_action_stats',
        },
        {
          createStatsDto,
        },
      ),
    );
  }

  async increaseActionStats(updateStatsDto: UpdateStatsDto) {
    return await lastValueFrom(
      this.workspaceMicroservice.send(
        {
          cmd: 'increase_action_stats',
        },
        {
          updateStatsDto,
        },
      ),
    );
  }

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
