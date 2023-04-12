import { Observable } from 'rxjs';
import { UseCase } from '../../../base/utils/IUseCase';
import { UserModel } from '../../../domain/models/user/user.model';
import { UserRepository } from '../../repositories/user/user.repository';
import { NewUserDTO } from 'src/domain/DTO/user/newUserDTO';
import { NewUserCommand } from 'src/domain/commands/user/newUserCommand';

export class CreateUserUseCase implements UseCase<NewUserCommand, NewUserDTO> {
  constructor(private userRepository: UserRepository) {}

  execute(user: NewUserCommand): Observable<NewUserDTO> {
    return this.userRepository.createUserAsync(user);
  }
}
