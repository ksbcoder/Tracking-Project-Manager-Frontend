import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { UserRepository } from 'src/bussiness/repositories/user/user.repository';
import { UserModel } from 'src/domain/models/user/user.model';

export class GetUserByIdUseCase implements UseCase<string, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(uidUser: string): Observable<UserModel> {
    return this.userRepository.getUserByIdAsync(uidUser);
  }
}
