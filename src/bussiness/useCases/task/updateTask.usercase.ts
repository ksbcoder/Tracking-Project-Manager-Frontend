import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { UpdateTaskDTO } from 'src/domain/DTO/task/updateTaskDTO';
import { UpdateTaskCommand } from 'src/domain/commands/task/updateTaskCommand';
import { TaskModel } from 'src/domain/models/task/task.model';

export class UpdateTaskUseCase
  implements
    UseCase<{ idTask: number; task: UpdateTaskCommand }, UpdateTaskDTO>
{
  constructor(private taskRepository: TaskRepository) {}

  execute(params: {
    idTask: number;
    task: UpdateTaskCommand;
  }): Observable<UpdateTaskDTO> {
    return this.taskRepository.updateTaskAsync(params);
  }
}
