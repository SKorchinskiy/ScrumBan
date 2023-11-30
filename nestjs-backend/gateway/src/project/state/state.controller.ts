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
import { StateService } from './state.service';
import { UpdateStateDto } from './dto/update-state.dto';
import { CreateStateDto } from './dto/create-state.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workspaces/:workspaceId/states')
@UseGuards(AuthGuard)
export class StateController {
  constructor(private stateService: StateService) {}

  @Post()
  async createWorkspaceState(
    @Param('workspaceId') workspaceId: number,
    @Body() createStateDto: CreateStateDto,
  ) {
    return await this.stateService.createWorkspaceState(
      workspaceId,
      createStateDto,
    );
  }

  @Put(':stateId')
  async updateWorkspaceState(
    @Param('stateId') stateId: number,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return await this.stateService.updateWorkspaceState(
      stateId,
      updateStateDto,
    );
  }

  @Delete(':stateId')
  async removeWorkspaceState(@Param('stateId') stateId: number) {
    return await this.stateService.removeWorkspaceState(stateId);
  }

  @Get(':stateId')
  async findWorkspaceStateByCriteria(@Param('stateId') stateId: number) {
    return await this.stateService.findWorkspaceStateByCriteria(stateId);
  }

  @Get()
  async findWorkspaceStates(@Param('workspaceId') workspaceId: number) {
    return await this.stateService.findWorkspaceStates(workspaceId);
  }
}
