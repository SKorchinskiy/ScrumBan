import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Controller('workspaces/:workspaceId/projects/:projectId/labels')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @Post()
  async createProjectLabel(
    @Param('projectId') projectId: number,
    @Body() createLabelDto: CreateLabelDto,
  ) {
    return await this.labelService.createProjectLabel(
      projectId,
      createLabelDto,
    );
  }

  @Put(':labelId')
  async updateProjectLabel(
    @Param('labelId') labelId: number,
    @Body() updateLabelDto: UpdateLabelDto,
  ) {
    return await this.labelService.updateProjectLabel(labelId, updateLabelDto);
  }

  @Delete(':labelId')
  async removeProjectLabel(@Param('labelId') labelId: number) {
    return await this.labelService.removeProjectLabel(labelId);
  }

  @Get(':labelId')
  async findProjectLabelByCriteria(@Param('labelId') labelId: number) {
    return await this.labelService.findProjectLabelByCriteria(labelId);
  }

  @Get()
  async findProjectLabels(@Param('projectId') projectId: number) {
    return await this.labelService.findProjectLabels(projectId);
  }
}
