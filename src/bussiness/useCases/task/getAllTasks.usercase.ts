import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { TaskModel } from 'src/domain/models/task/task.model';

export class GetAllTasksUseCase implements UseCase<void, TaskModel[]> {
  constructor(private taskRepository: TaskRepository) {}

  execute(): Observable<TaskModel[]> {
    return this.taskRepository.getAllTasksAsync();
  }
}
