import { Module } from '@nestjs/common';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { databaseProviders } from 'src/providers/database.provider';
import { projectProviders } from 'src/providers/project.provider';

@Module({
  controllers: [LabelController],
  providers: [LabelService, ...databaseProviders, ...projectProviders],
})
export class LabelModule {}
