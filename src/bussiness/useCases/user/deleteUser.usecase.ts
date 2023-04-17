import { Observable } from 'rxjs';
import { UseCase } from '../../../base/utils/IUseCase';
import { UserRepository } from '../../repositories/user/user.repository';
import { UpdateUserDTO } from 'src/domain/DTO/user/updateUserDTO';

export class DeleteUserUseCase implements UseCase<string, UpdateUserDTO> {
  constructor(private userRepository: UserRepository) {}

  execute(uidUser: string): Observable<UpdateUserDTO> {
    return this.userRepository.deleteUserAsync(uidUser);
  }
}
