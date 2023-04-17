import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { UpdateProjectDTO } from 'src/domain/DTO/project/updateProjectDTO';

export class DeleteProjectUseCase implements UseCase<string, UpdateProjectDTO> {
  constructor(private projectRepository: ProjectRepository) {}

  execute(idProject: string): Observable<UpdateProjectDTO> {
    return this.projectRepository.deleteProjectAsync(idProject);
  }
}
