import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class AppModule {}
