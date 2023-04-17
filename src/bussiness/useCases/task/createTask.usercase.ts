import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { NewTaskDTO } from 'src/domain/DTO/task/newTaskDTO';
import { NewTaskCommand } from 'src/domain/commands/task/newTaskCommand';

export class CreateTaskUseCase implements UseCase<NewTaskCommand, NewTaskDTO> {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: NewTaskCommand): Observable<NewTaskDTO> {
    return this.taskRepository.createTaskAsync(task);
  }
}
