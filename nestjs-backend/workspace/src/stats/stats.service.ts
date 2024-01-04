import { Inject, Injectable } from '@nestjs/common';
import { CreateStatsDto } from 'src/dto/create-stats.dto';
import { StatsDto } from 'src/dto/get-stats.dto';
import { UpdateStatsDto } from 'src/dto/update-stats.dto';
import { StatsEntity } from 'src/entities/stats.entity';
import { WorkspaceEntity } from 'src/entities/workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @Inject('STATS_REPOSITORY')
    private statsRepository: Repository<StatsEntity>,
    @Inject('WORKSPACE_REPOSITORY')
    private workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  async getActionStats({
    workspaceId,
    limit,
  }: StatsDto): Promise<StatsEntity[]> {
    const workspace: WorkspaceEntity = await this.workspaceRepository.findOneBy(
      { workspace_id: workspaceId },
    );

    const stats: StatsEntity[] = await this.statsRepository.find({
      where: { workspace },
      order: { createdAt: 'DESC' },
      take: limit,
    });

    return stats;
  }

  async createActionStats(
    createStatsDto: CreateStatsDto,
  ): Promise<StatsEntity> {
    const workspace: WorkspaceEntity = await this.workspaceRepository.findOneBy(
      { workspace_id: createStatsDto.workspaceId },
    );

    const targetStat = this.statsRepository.create({
      workspace: workspace,
      createdAt: createStatsDto.createdAt,
    });
    return await this.statsRepository.save(targetStat);
  }

  async increaseActionStats(
    updateStatsDto: UpdateStatsDto,
  ): Promise<StatsEntity> {
    const workspace: WorkspaceEntity = await this.workspaceRepository.findOneBy(
      { workspace_id: updateStatsDto.workspaceId },
    );

    let targetStat = await this.statsRepository.findOneBy({
      workspace,
      createdAt: updateStatsDto.createdAt,
    });
    if (!targetStat) {
      targetStat = await this.createActionStats(updateStatsDto);
    }
    targetStat.countOfActivities++;

    return await this.statsRepository.save(targetStat);
  }
}
