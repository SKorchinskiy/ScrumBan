import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Injectable()
export class LabelService {
  constructor(@Inject('PROJECT') private projectMicroservice: ClientProxy) {}

  async createProjectLabel(projectId: number, createLabelDto: CreateLabelDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_project_label',
        },
        {
          projectId,
          createLabelDto,
        },
      ),
    );
  }

  async updateProjectLabel(labelId: number, updateLabelDto: UpdateLabelDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'update_project_label',
        },
        {
          labelId,
          updateLabelDto,
        },
      ),
    );
  }

  async removeProjectLabel(labelId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'remove_project_label',
        },
        {
          labelId,
        },
      ),
    );
  }

  async findProjectLabels(projectId: number) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_labels',
        },
        {
          projectId,
        },
      ),
    );
  }

  async findProjectLabelByCriteria(labelId: number) {
    return lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_project_label_by',
        },
        {
          labelId,
        },
      ),
    );
  }
}
