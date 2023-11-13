import { Controller } from '@nestjs/common';
import { LabelService } from './label.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { CreateLabelDto } from 'src/dto/create-label.dto';
import { UpdateLabelDto } from 'src/dto/update-label.dto';
import { LabelEntity } from 'src/entities/label.entity';

@Controller('label')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @MessagePattern({ cmd: 'create_project_label' })
  async createProjectLabel(
    @Payload() payload: { projectId: number; createLabelDto: CreateLabelDto },
  ): Promise<LabelEntity> {
    return this.labelService.createProjectLabel(
      payload.projectId,
      payload.createLabelDto,
    );
  }

  @MessagePattern({ cmd: 'update_project_label' })
  async updateProjectLabel(
    @Payload()
    payload: {
      labelId: number;
      updateLabelDto: UpdateLabelDto;
    },
  ): Promise<LabelEntity> {
    return this.labelService.updateProjectLabel(
      payload.labelId,
      payload.updateLabelDto,
    );
  }

  @MessagePattern({ cmd: 'remove_project_label' })
  async removeProjectLabel(
    @Payload() payload: { labelId: number },
  ): Promise<LabelEntity> {
    return this.labelService.removeProjectLabel(payload.labelId);
  }

  @MessagePattern({ cmd: 'find_project_labels' })
  async findProjectLabels(
    @Payload() payload: { projectId: number },
  ): Promise<LabelEntity[]> {
    return this.labelService.findProjectLabels(payload.projectId);
  }

  @MessagePattern({ cmd: 'find_project_label_by' })
  async findProjectLabelByCriteria(
    @Payload() payload: { labelId: number },
  ): Promise<LabelEntity> {
    return this.labelService.findProjectLabelByCriteria(payload.labelId);
  }
}
