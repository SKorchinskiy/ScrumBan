import { Controller } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsEntity } from 'src/entities/stats.entity';
import { StatsDto } from 'src/dto/get-stats.dto';
import { CreateStatsDto } from 'src/dto/create-stats.dto';
import { UpdateStatsDto } from 'src/dto/update-stats.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class StatsController {
  constructor(private statsService: StatsService) {}

  @MessagePattern({ cmd: 'get_action_stats' })
  async getActionStats(
    @Payload() payload: { statsDto: StatsDto },
  ): Promise<StatsEntity[]> {
    return await this.statsService.getActionStats(payload.statsDto);
  }

  @MessagePattern({ cmd: 'create_action_stats' })
  async createActionStats(
    @Payload() payload: { createStatsDto: CreateStatsDto },
  ): Promise<StatsEntity> {
    return await this.statsService.createActionStats(payload.createStatsDto);
  }

  @MessagePattern({ cmd: 'increase_action_stats' })
  async increaseActionStats(
    @Payload() payload: { updateStatsDto: UpdateStatsDto },
  ): Promise<StatsEntity> {
    return await this.statsService.increaseActionStats(payload.updateStatsDto);
  }
}
