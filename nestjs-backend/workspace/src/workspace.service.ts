import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorkspaceEntity } from './entities/workspace.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject('WORKSPACE_REPOSITORY')
    private workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  async createWorkspace(createWorkspaceDto: CreateWorkspaceDto) {
    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    return await this.workspaceRepository.save(workspace);
  }

  async updateWorkspace(
    workspaceId: number,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    await this.workspaceRepository.update(
      {
        workspace_id: workspaceId,
      },
      updateWorkspaceDto,
    );

    return await this.workspaceRepository.findOne({
      where: {
        workspace_id: workspaceId,
      },
    });
  }

  async findUserWorkspaces(userId: number) {
    return await this.workspaceRepository.find({
      where: {
        workspace_owner: userId,
      },
    });
  }

  async findUserWorkspaceByCriteria(workspaceId: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        workspace_id: workspaceId,
      },
    });

    return await this.workspaceRepository.remove(workspace);
  }
}
