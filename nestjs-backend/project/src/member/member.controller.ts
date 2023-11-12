import { Controller } from '@nestjs/common';
import { MemberService } from './member.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @MessagePattern({ cmd: 'add_project_member' })
  async addProjectMember(): Promise<any> {
    return await this.memberService.addProjectMember();
  }

  @MessagePattern({ cmd: 'update_project_member' })
  async updateProjectMember(): Promise<any> {
    return await this.memberService.updateProjectMember();
  }

  @MessagePattern({ cmd: 'remove_project_member' })
  async removeProjectMember(): Promise<any> {
    return await this.memberService.removeProjectMember();
  }

  @MessagePattern({ cmd: 'find_project_members' })
  async findProjectMembers(): Promise<any> {
    return await this.memberService.findProjectMembers();
  }

  @MessagePattern({ cmd: 'find_project_member_by' })
  async findProjectMemberByCriteria(): Promise<any> {
    return await this.memberService.findProjectMemberByCriteria();
  }
}
