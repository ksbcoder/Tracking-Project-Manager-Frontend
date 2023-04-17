import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { TaskModel } from 'src/domain/models/task/task.model';

export class GetTaskByIdUseCase implements UseCase<number, TaskModel> {
  constructor(private taskRepository: TaskRepository) {}

  execute(idTask: number): Observable<TaskModel> {
    return this.taskRepository.getTaskByIdAsync(idTask);
  }
}
