import { Observable } from 'rxjs';
import { UseCase } from 'src/base/utils/IUseCase';
import { UserRepository } from 'src/bussiness/repositories/user/user.repository';
import { UpdateUserDTO } from 'src/domain/DTO/user/updateUserDTO';
import { UserModel } from 'src/domain/models/user/user.model';

export class UpdateUserUseCase
  implements UseCase<{ uidUser: string; user: UserModel }, UpdateUserDTO>
{
  constructor(private userRepository: UserRepository) {}

  execute(params: {
    uidUser: string;
    user: UserModel;
  }): Observable<UpdateUserDTO> {
    return this.userRepository.updateUserAsync(params);
  }
}
