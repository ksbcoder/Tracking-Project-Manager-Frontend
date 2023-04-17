import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { UpdateTaskDTO } from 'src/domain/DTO/task/updateTaskDTO';
import { TaskModel } from 'src/domain/models/task/task.model';

export class AssignTaskUseCase
  implements UseCase<{ idTask: number; uidUser: string }, UpdateTaskDTO>
{
  constructor(private taskRepository: TaskRepository) {}

  execute(params: {
    idTask: number;
    uidUser: string;
  }): Observable<UpdateTaskDTO> {
    return this.taskRepository.assignTaskAsync(params);
  }
}
