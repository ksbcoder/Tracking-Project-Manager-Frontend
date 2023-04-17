import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { ProjectRepository } from 'src/bussiness/repositories/project/project.repository';
import { ProjectModel } from 'src/domain/models/project/project.model';

export class GetProjectsByLeaderIdUseCase
  implements UseCase<string, ProjectModel[]>
{
  constructor(private projectRepository: ProjectRepository) {}

  execute(idLeader: string): Observable<ProjectModel[]> {
    return this.projectRepository.getProjectsByLeaderIdAsync(idLeader);
  }
}
