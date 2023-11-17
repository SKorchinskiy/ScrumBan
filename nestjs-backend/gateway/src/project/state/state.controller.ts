import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StateService } from './state.service';
import { UpdateStateDto } from './dto/update-state.dto';
import { CreateStateDto } from './dto/create-state.dto';

@Controller('workspaces/:workspaceId/projects/:projectId/states')
export class StateController {
  constructor(private stateService: StateService) {}

  @Post()
  async createProjectState(
    @Param('projectId') projectId: number,
    @Body() createStateDto: CreateStateDto,
  ) {
    return await this.stateService.createProjectState(
      projectId,
      createStateDto,
    );
  }

  @Put(':stateId')
  async updateProjectState(
    @Param('stateId') stateId: number,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return await this.stateService.updateProjectState(stateId, updateStateDto);
  }

  @Delete(':stateId')
  async removeProjectState(@Param('stateId') stateId: number) {
    return await this.stateService.removeProjectState(stateId);
  }

  @Get(':stateId')
  async findProjectStateByCriteria(@Param('stateId') stateId: number) {
    return await this.stateService.findProjectStateByCriteria(stateId);
  }

  @Get()
  async findProjectStates(@Param('projectId') projectId: number) {
    return await this.stateService.findProjectStates(projectId);
  }
}
