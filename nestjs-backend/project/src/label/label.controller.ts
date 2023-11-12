import { Controller } from '@nestjs/common';
import { LabelService } from './label.service';

@Controller('label')
export class LabelController {
  constructor(private labelService: LabelService) {}

  async createProjectLabel(): Promise<any> {
    return this.labelService.createProjectLabel();
  }

  async updateProjectLabel(): Promise<any> {
    return this.labelService.updateProjectLabel();
  }

  async removeProjectLabel(): Promise<any> {
    return this.labelService.removeProjectLabel();
  }

  async findProjectLabels(): Promise<any> {
    return this.labelService.findProjectLabels();
  }

  async findProjectLabelByCriteria(): Promise<any> {
    return this.labelService.findProjectLabelByCriteria();
  }
}
