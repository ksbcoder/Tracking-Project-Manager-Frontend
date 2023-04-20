import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { UpdateProjectDTO } from 'src/domain/DTO/project/updateProjectDTO';
import { OpenProjectCommand } from 'src/domain/commands/project/openProjectCommand';

export class OpenProjectUseCase
  implements
  UseCase<
    { idProject: string; idLeader: string; project: OpenProjectCommand },
    UpdateProjectDTO
  >
{
  constructor(private projectRepository: ProjectRepository) { }

  execute(params: {
    idProject: string;
    idLeader: string;
    project: OpenProjectCommand;
  }): Observable<UpdateProjectDTO> {
    return this.projectRepository.openProjectAsync(params);
  }
}
