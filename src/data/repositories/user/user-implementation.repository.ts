import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewUserDTO } from 'src/domain/DTO/user/newUserDTO';
import { UserModel } from 'src/domain/models/user/user.model';
import { UpdateUserDTO } from 'src/domain/DTO/user/updateUserDTO';
// import { NewUserToUserRepositoryMapper } from './mappers/user-repository.mapper';
// import { UpdateUserToUserRepositoryMapper } from './mappers/user-repository.mapper';
import { UserRepository } from 'src/bussiness/repositories/user/user.repository';
import { NewUserCommand } from 'src/domain/commands/user/newUserCommand';
import { UserInterface } from 'src/domain/models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  // newUserMapper = new NewUserToUserRepositoryMapper();
  // updateUserMapper = new UpdateUserToUserRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  createUserAsync(user: NewUserCommand): Observable<NewUserDTO> {
    return this.http.post<NewUserDTO>(environment.urlApiUsers, user);
  }

  deleteUserAsync(uidUser: string): Observable<UpdateUserDTO> {
    return this.http.delete<UpdateUserDTO>(
      environment.urlApiUsers + 'ID + params'
    );
  }

  getUserByIdAsync(uidUser: string): Observable<UserModel> {
    return this.http.get<UserModel>(
      environment.urlApiUsers + 'ID?uidUser=' + uidUser
    );
  }

  updateUserAsync(params: {
    uidUser: string;
    user: UserModel;
  }): Observable<UpdateUserDTO> {
    return this.http.put<UpdateUserDTO>(environment.urlApiUsers + 'ID', {
      params,
    });
  }
}
