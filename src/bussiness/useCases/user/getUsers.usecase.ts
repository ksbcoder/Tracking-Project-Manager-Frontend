import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { UserRepository } from 'src/bussiness/repositories/user/user.repository';
import { UserModel } from 'src/domain/models/user/user.model';

export class GetUsersUseCase implements UseCase<void, UserModel[]> {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserModel[]> {
    return this.userRepository.getUsersAsync();
  }
}
