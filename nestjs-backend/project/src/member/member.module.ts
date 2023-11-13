import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { databaseProviders } from 'src/providers/database.provider';
import { projectProviders } from 'src/providers/project.provider';

@Module({
  controllers: [MemberController],
  providers: [MemberService, ...databaseProviders, ...projectProviders],
})
export class MemberModule {}
