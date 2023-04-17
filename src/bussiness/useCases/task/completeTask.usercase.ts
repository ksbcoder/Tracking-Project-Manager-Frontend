import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { UpdateTaskDTO } from 'src/domain/DTO/task/updateTaskDTO';

export class CompleteTaskUseCase implements UseCase<number, UpdateTaskDTO> {
  constructor(private taskRepository: TaskRepository) {}

  execute(idTask: number): Observable<UpdateTaskDTO> {
    return this.taskRepository.completeTaskAsync(idTask);
  }
}
