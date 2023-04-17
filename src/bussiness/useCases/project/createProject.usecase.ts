import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { NewProjectDTO } from 'src/domain/DTO/project/newProjectDTO';
import { NewProjectCommand } from 'src/domain/commands/project/newProjectCommand';

export class CreateProjectUseCase
  implements UseCase<NewProjectCommand, NewProjectDTO>
{
  constructor(private projectRepository: ProjectRepository) {}

  execute(project: NewProjectCommand): Observable<NewProjectDTO> {
    return this.projectRepository.createProjectAsync(project);
  }
}
