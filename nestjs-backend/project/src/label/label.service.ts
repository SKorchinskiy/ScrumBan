import { Inject, Injectable } from '@nestjs/common';
import { CreateLabelDto } from 'src/dto/create-label.dto';
import { UpdateLabelDto } from 'src/dto/update-label.dto';
import { LabelEntity } from 'src/entities/label.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabelService {
  constructor(
    @Inject('LABEL_REPOSITORY')
    private labelRepository: Repository<LabelEntity>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async createProjectLabel(
    projectId: number,
    createLabelDto: CreateLabelDto,
  ): Promise<LabelEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const label = await this.labelRepository.create({
      ...createLabelDto,
      project,
    });

    return await this.labelRepository.save(label);
  }

  async updateProjectLabel(
    labelId: number,
    updateLabelDto: UpdateLabelDto,
  ): Promise<LabelEntity> {
    await this.labelRepository.update(
      {
        label_id: labelId,
      },
      updateLabelDto,
    );

    return await this.labelRepository.findOne({
      where: {
        label_id: labelId,
      },
    });
  }

  async removeProjectLabel(labelId: number): Promise<LabelEntity> {
    const label = await this.labelRepository.findOne({
      where: {
        label_id: labelId,
      },
    });
    return await this.labelRepository.remove(label);
  }

  async findProjectLabels(projectId: number): Promise<LabelEntity[]> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.labelRepository.find({
      where: {
        project,
      },
    });
  }

  async findProjectLabelByCriteria(labelId: number): Promise<LabelEntity> {
    return await this.labelRepository.findOne({
      where: {
        label_id: labelId,
      },
    });
  }
}
