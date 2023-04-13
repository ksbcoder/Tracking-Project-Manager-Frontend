import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserImplementationRepository } from './user-implementation.repository';
import { UserRepository } from 'src/bussiness/repositories/user/user.repository';
import { CreateUserUseCase } from 'src/bussiness/useCases/user/createUser.usecase';
import { DeleteUserUseCase } from 'src/bussiness/useCases/user/deleteUser.usecase';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { UpdateUserUseCase } from 'src/bussiness/useCases/user/updateUser.usecase';
import { GetUsersUseCase } from 'src/bussiness/useCases/user/getUsers.usecase';

const createUserUseCaseFactory = (userRepo: UserRepository) =>
  new CreateUserUseCase(userRepo);
export const createUserUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: createUserUseCaseFactory,
  deps: [UserRepository],
};

const deleteUserUseCaseFactory = (userRepo: UserRepository) =>
  new DeleteUserUseCase(userRepo);
export const deleteUserUseCaseProvider = {
  provide: DeleteUserUseCase,
  useFactory: deleteUserUseCaseFactory,
  deps: [UserRepository],
};

const getUserByIdUseCaseFactory = (userRepo: UserRepository) =>
  new GetUserByIdUseCase(userRepo);
export const getUserByIdUseCaseProvider = {
  provide: GetUserByIdUseCase,
  useFactory: getUserByIdUseCaseFactory,
  deps: [UserRepository],
};

const getUsersUseCaseFactory = (userRepo: UserRepository) =>
  new GetUsersUseCase(userRepo);
export const getUsersUseCaseProvider = {
  provide: GetUsersUseCase,
  useFactory: getUsersUseCaseFactory,
  deps: [UserRepository],
};

const updateUserUseCaseFactory = (userRepo: UserRepository) =>
  new UpdateUserUseCase(userRepo);
export const updateUserUseCaseProvider = {
  provide: UpdateUserUseCase,
  useFactory: updateUserUseCaseFactory,
  deps: [UserRepository],
};

@NgModule({
  providers: [
    createUserUseCaseProvider,
    deleteUserUseCaseProvider,
    getUserByIdUseCaseProvider,
    getUsersUseCaseProvider,
    updateUserUseCaseProvider,
    { provide: UserRepository, useClass: UserImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class UserModule {}
