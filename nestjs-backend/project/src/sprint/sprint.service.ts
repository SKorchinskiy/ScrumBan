import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateSprintDto } from 'src/dto/create-sprint.dto';
import { UpdateSprintDto } from 'src/dto/update-sprint.dto';
import { IssueEntity } from 'src/entities/issue.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { SprintEntity } from 'src/entities/sprint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SprintService {
  constructor(
    @Inject('SPRINT_REPOSITORY')
    private sprintRepository: Repository<SprintEntity>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
    @Inject('ISSUE_REPOSITORY')
    private issueRepository: Repository<IssueEntity>,
  ) {}

  async getSprintIssues(sprintId: number): Promise<IssueEntity[]> {
    const sprint = await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
    });

    const issues = await this.issueRepository.find({
      where: {
        sprint: sprint,
      },
      relations: {
        sprint: true,
        project: true,
        issue_labels: true,
        issue_state: true,
      },
    });

    return issues;
  }

  async createProjectSprint(
    projectId: number,
    createSprintDto: CreateSprintDto,
  ): Promise<SprintEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const sprint = this.sprintRepository.create({
      ...createSprintDto,
      project,
    });

    return await this.sprintRepository.save(sprint);
  }

  async updateProjectSprint(
    sprintId: number,
    updateSprintDto: UpdateSprintDto,
  ): Promise<SprintEntity> {
    await this.sprintRepository.update(
      { sprint_id: sprintId },
      updateSprintDto,
    );

    return await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
    });
  }

  async removeProjectSprint(sprintId: number): Promise<SprintEntity> {
    const sprint = await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
    });

    return await this.sprintRepository.remove(sprint);
  }

  async findProjectSprints(projectId: number): Promise<SprintEntity[]> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.sprintRepository.find({
      where: {
        project,
      },
      relations: {
        issues: true,
      },
    });
  }

  async findProjectSprintByCriteria(sprintId: number): Promise<SprintEntity> {
    return await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
      relations: {
        issues: true,
      },
    });
  }

  async addIssueToProjectSprint(
    issueId: number,
    sprintId: number,
  ): Promise<SprintEntity> {
    const sprint = await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
      relations: {
        project: true,
        issues: true,
      },
    });

    const issue = await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
      relations: {
        project: true,
        sprint: true,
        issue_state: true,
      },
    });

    if (sprint.project?.project_id !== issue.project?.project_id) {
      throw new RpcException('Access denied!');
    }
    const sprintIssues = sprint.issues ? [...sprint.issues] : [];
    sprintIssues.push(issue);
    sprint.issues = sprintIssues;

    return await this.sprintRepository.save(sprint);
  }

  async removeIssueFromProjectSprint(issueId: number, sprintId: number) {
    const sprint = await this.sprintRepository.findOne({
      where: {
        sprint_id: sprintId,
      },
      relations: {
        issues: true,
      },
    });

    sprint.issues = sprint.issues
      ? sprint.issues.filter((issue) => +issue.issue_id !== +issueId)
      : [];

    return await this.sprintRepository.save(sprint);
  }
}
