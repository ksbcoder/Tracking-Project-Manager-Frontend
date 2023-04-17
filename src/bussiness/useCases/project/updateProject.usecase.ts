import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { UpdateProjectDTO } from 'src/domain/DTO/project/updateProjectDTO';
import { UpdateProjectCommand } from '../../../domain/commands/project/updateProjectCommand';

export class UpdateProjectUseCase
  implements
    UseCase<
      { idProject: string; project: UpdateProjectCommand },
      UpdateProjectDTO
    >
{
  constructor(private projectRepository: ProjectRepository) {}

  execute(params: {
    idProject: string;
    project: UpdateProjectCommand;
  }): Observable<UpdateProjectDTO> {
    return this.projectRepository.updateProjectAsync(params);
  }
}
