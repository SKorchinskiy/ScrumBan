import { Controller } from '@nestjs/common';
import { MemberService } from './member.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateProjectMember } from 'src/dto/update-project-member.dto';
import { MemberEntity } from 'src/entities/member.entity';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @MessagePattern({ cmd: 'add_project_member' })
  async addProjectMember(
    @Payload() payload: { memberId: number; projectId: number },
  ): Promise<MemberEntity> {
    return await this.memberService.addProjectMember(
      payload.memberId,
      payload.projectId,
    );
  }

  @MessagePattern({ cmd: 'update_project_member' })
  async updateProjectMember(
    @Payload()
    payload: {
      memberId: number;
      projectId: number;
      updateProjectMember: UpdateProjectMember;
    },
  ): Promise<MemberEntity> {
    return await this.memberService.updateProjectMember(
      payload.memberId,
      payload.projectId,
      payload.updateProjectMember,
    );
  }

  @MessagePattern({ cmd: 'remove_project_member' })
  async removeProjectMember(
    @Payload() payload: { memberId: number; projectId: number },
  ): Promise<MemberEntity> {
    return await this.memberService.removeProjectMember(
      payload.memberId,
      payload.projectId,
    );
  }

  @MessagePattern({ cmd: 'find_project_members' })
  async findProjectMembers(
    @Payload() payload: { projectId: number },
  ): Promise<MemberEntity[]> {
    return await this.memberService.findProjectMembers(payload.projectId);
  }

  @MessagePattern({ cmd: 'find_project_member_by' })
  async findProjectMemberByCriteria(
    @Payload() payload: { projectId: number; memberId: number },
  ): Promise<MemberEntity> {
    return await this.memberService.findProjectMemberByCriteria(
      payload.memberId,
      payload.projectId,
    );
  }
}
