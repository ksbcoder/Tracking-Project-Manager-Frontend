import { Observable } from 'rxjs';
import { UserModel } from '../../../domain/models/user/user.model';
import { NewUserDTO } from 'src/domain/DTO/user/newUserDTO';
import { UpdateUserDTO } from 'src/domain/DTO/user/updateUserDTO';
import { UserInterface } from 'src/domain/models/user/user.interface';
import { NewUserCommand } from '../../../domain/commands/user/newUserCommand';

export abstract class UserRepository {
  abstract createUserAsync(user: NewUserCommand): Observable<NewUserDTO>;

  abstract deleteUserAsync(uidUser: string): Observable<UpdateUserDTO>;

  abstract getUserByIdAsync(uidUser: string): Observable<UserModel>;

  abstract updateUserAsync(params: {
    uidUser: string;
    user: UserModel;
  }): Observable<UpdateUserDTO>;
}
