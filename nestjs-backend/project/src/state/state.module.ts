import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { databaseProviders } from 'src/providers/database.provider';
import { projectProviders } from 'src/providers/project.provider';

@Module({
  controllers: [StateController],
  providers: [StateService, ...databaseProviders, ...projectProviders],
})
export class StateModule {}
