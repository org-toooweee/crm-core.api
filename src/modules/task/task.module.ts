import { Module } from '@nestjs/common';
import { TaskController } from './presentation/http/task.controller';

@Module({
  controllers: [TaskController],
})
export class TaskModule {}
