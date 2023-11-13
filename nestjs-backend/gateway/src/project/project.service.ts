import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProjectDto } from 'src/dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT') private readonly projectMicroservice: ClientProxy,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'create_project',
        },
        createProjectDto,
      ),
    );
  }

  async findProjects() {
    return await lastValueFrom(
      this.projectMicroservice.send(
        {
          cmd: 'find_projects',
        },
        {},
      ),
    );
  }
}
