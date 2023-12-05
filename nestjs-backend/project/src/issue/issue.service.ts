import { Inject, Injectable } from '@nestjs/common';
import { CreateIssueDto } from 'src/dto/create-issue.dto';
import { UpdateIssueDto } from 'src/dto/update-issue.dto';
import { IssueEntity } from 'src/entities/issue.entity';
import { LabelEntity } from 'src/entities/label.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { StateEntity } from 'src/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssueService {
  constructor(
    @Inject('ISSUE_REPOSITORY')
    private issueRepository: Repository<IssueEntity>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
    @Inject('STATE_REPOSITORY')
    private stateRepository: Repository<StateEntity>,
    @Inject('MEMBER_REPOSITORY')
    private memberRepository: Repository<MemberEntity>,
    @Inject('LABEL_REPOSITORY')
    private labelRepository: Repository<LabelEntity>,
  ) {}

  async getWorkspaceIssues(workspaceId: number): Promise<IssueEntity[]> {
    const issues = await this.issueRepository
      .createQueryBuilder('I')
      .innerJoinAndSelect('I.project', 'P')
      .innerJoinAndSelect('I.issue_state', 'S')
      .where(`P.workspace_id = ${workspaceId}`)
      .getMany();
    return issues;
  }

  async createProjectIssue(
    projectId: number,
    createIssueDto: CreateIssueDto,
  ): Promise<IssueEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const { issue_state_id, ...restParams } = createIssueDto;

    const issue_state = await this.stateRepository.findOne({
      where: {
        state_id: issue_state_id,
      },
    });

    const issue = this.issueRepository.create({
      ...restParams,
      issue_state,
      project,
    });

    return await this.issueRepository.save(issue);
  }

  async updateProjectIssue(
    issueId: number,
    updateIssueDto: UpdateIssueDto,
  ): Promise<IssueEntity> {
    if (updateIssueDto.issue_state_id) {
      const { issue_state_id, ...restParams } = updateIssueDto;
      const issue_state = await this.stateRepository.findOne({
        where: {
          state_id: issue_state_id,
        },
      });
      await this.issueRepository.update(
        {
          issue_id: issueId,
        },
        {
          issue_state,
          ...restParams,
        },
      );
    } else {
      await this.issueRepository.update(
        {
          issue_id: issueId,
        },
        updateIssueDto,
      );
    }

    return await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
    });
  }

  async removeProjectIssue(issueId: number): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
    });

    return await this.issueRepository.remove(issue);
  }

  async findProjectIssues(projectId: number): Promise<IssueEntity[]> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.issueRepository.find({
      where: {
        project,
      },
      relations: {
        issue_state: true,
        issue_labels: true,
      },
    });
  }

  async findProjectIssueByCriteria(issueId: number): Promise<IssueEntity> {
    return await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
      relations: {
        issue_state: true,
        issue_labels: true,
      },
    });
  }

  async addIssueAssignee(
    issueId: number,
    memberId: number,
  ): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
    });
    const member = await this.memberRepository.findOne({
      where: {
        user_id: memberId,
      },
    });

    issue.assignees.push(member);

    return await this.issueRepository.save(issue);
  }

  async removeIssueAssignee(
    issueId: number,
    memberId: number,
  ): Promise<IssueEntity> {
    const issue = await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
    });
    const member = await this.memberRepository.findOne({
      where: {
        user_id: memberId,
      },
    });

    issue.assignees = issue.assignees.filter(
      (issueMember) => issueMember.id !== member.id,
    );

    return await this.issueRepository.save(issue);
  }

  async addIssueLabel(issueId: number, labelId: number) {
    const issue = await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
    });

    const label = await this.labelRepository.findOne({
      where: {
        label_id: labelId,
      },
    });

    if (!issue.issue_labels) {
      issue.issue_labels = [];
    }
    issue.issue_labels.push(label);

    return await this.issueRepository.save(issue);
  }

  async removeIssueLabel(issueId: number, labelId: number) {
    const issue = await this.issueRepository.findOne({
      where: {
        issue_id: issueId,
      },
    });

    issue.issue_labels = issue.issue_labels.filter(
      (label) => label.label_id !== labelId,
    );

    return await this.issueRepository.save(issue);
  }
}
