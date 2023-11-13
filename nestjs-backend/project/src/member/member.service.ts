import { Inject, Injectable } from '@nestjs/common';
import { UpdateProjectMember } from 'src/dto/update-project-member.dto';
import { MemberEntity } from 'src/entities/member.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<ProjectEntity>,
    @Inject('MEMBER_REPOSITORY')
    private memberRepository: Repository<MemberEntity>,
  ) {}

  async addProjectMember(
    memberId: number,
    projectId: number,
  ): Promise<MemberEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const membership = this.memberRepository.create({
      user_id: memberId,
      project,
      role: 'user',
    });

    return await this.memberRepository.save(membership);
  }

  async updateProjectMember(
    memberId: number,
    projectId: number,
    updateProjectMember: UpdateProjectMember,
  ): Promise<MemberEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    await this.memberRepository.update(
      {
        user_id: memberId,
        project,
      },
      updateProjectMember,
    );

    return await this.memberRepository.findOne({
      where: {
        user_id: memberId,
        project,
      },
    });
  }

  async removeProjectMember(
    memberId: number,
    projectId: number,
  ): Promise<MemberEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    const membership = await this.memberRepository.findOne({
      where: {
        user_id: memberId,
        project,
      },
    });

    await this.memberRepository.remove(membership);
    return membership;
  }

  async findProjectMembers(projectId: number): Promise<MemberEntity[]> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.memberRepository.find({
      where: {
        project,
      },
    });
  }

  async findProjectMemberByCriteria(
    memberId: number,
    projectId: number,
  ): Promise<MemberEntity> {
    const project = await this.projectRepository.findOne({
      where: {
        project_id: projectId,
      },
    });

    return await this.memberRepository.findOne({
      where: {
        user_id: memberId,
        project,
      },
    });
  }
}
