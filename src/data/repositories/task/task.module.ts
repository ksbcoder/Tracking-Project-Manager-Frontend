import { CreateTaskUseCase } from '../../../bussiness/useCases/task/createTask.usercase';
import { GetAllTasksUseCase } from '../../../bussiness/useCases/task/getAllTasks.usercase';
import { GetUnassignedTasksUseCase } from '../../../bussiness/useCases/task/getUnassignedTasks.usercase';
import { GetTasksByUserIdUseCase } from '../../../bussiness/useCases/task/getTasksByUserId.usercase';
import { CompleteTaskUseCase } from '../../../bussiness/useCases/task/completeTask.usercase';
import { NgModule } from '@angular/core';
import { TaskRepository } from 'src/bussiness/repositories/task/task.repository';
import { AssignTaskUseCase } from 'src/bussiness/useCases/task/assignTask.usercase';
import { DeleteTaskUseCase } from 'src/bussiness/useCases/task/deleteTask.usercase';
import { GetTaskByIdUseCase } from 'src/bussiness/useCases/task/getTaskById.usercase';
import { UpdateTaskUseCase } from 'src/bussiness/useCases/task/updateTask.usercase';
import { TaskImplementationRepository } from './task-implementation.repository';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
const CreateTaskUseCaseFactory = (taskRepo: TaskRepository) =>
  new CreateTaskUseCase(taskRepo);
export const CreateTaskUseCaseProvider = {
  provide: CreateTaskUseCase,
  useFactory: CreateTaskUseCaseFactory,
  deps: [TaskRepository],
};

const DeleteTaskUseCaseFactory = (taskRepo: TaskRepository) =>
  new DeleteTaskUseCase(taskRepo);
export const DeleteTaskUseCaseProvider = {
  provide: DeleteTaskUseCase,
  useFactory: DeleteTaskUseCaseFactory,
  deps: [TaskRepository],
};

const GetTaskByIdUseCaseFactory = (taskRepo: TaskRepository) =>
  new GetTaskByIdUseCase(taskRepo);
export const GetTaskByIdUseCaseProvider = {
  provide: GetTaskByIdUseCase,
  useFactory: GetTaskByIdUseCaseFactory,
  deps: [TaskRepository],
};

const GetAllTasksUseCaseFactory = (taskRepo: TaskRepository) =>
  new GetAllTasksUseCase(taskRepo);
export const GetAllTasksUseCaseProvider = {
  provide: GetAllTasksUseCase,
  useFactory: GetAllTasksUseCaseFactory,
  deps: [TaskRepository],
};

const GetUnassignedTasksUseCaseFactory = (taskRepo: TaskRepository) =>
  new GetUnassignedTasksUseCase(taskRepo);
export const GetUnassignedTasksUseCaseProvider = {
  provide: GetUnassignedTasksUseCase,
  useFactory: GetUnassignedTasksUseCaseFactory,
  deps: [TaskRepository],
};

const GetTasksByUserIdUseCaseFactory = (taskRepo: TaskRepository) =>
  new GetTasksByUserIdUseCase(taskRepo);
export const GetTasksByUserIdUseCaseProvider = {
  provide: GetTasksByUserIdUseCase,
  useFactory: GetTasksByUserIdUseCaseFactory,
  deps: [TaskRepository],
};

const UpdateTaskUseCaseFactory = (taskRepo: TaskRepository) =>
  new UpdateTaskUseCase(taskRepo);
export const UpdateTaskUseCaseProvider = {
  provide: UpdateTaskUseCase,
  useFactory: UpdateTaskUseCaseFactory,
  deps: [TaskRepository],
};

const AssignTaskUseCaseFactory = (taskRepo: TaskRepository) =>
  new AssignTaskUseCase(taskRepo);
export const AssignTaskUseCaseProvider = {
  provide: AssignTaskUseCase,
  useFactory: AssignTaskUseCaseFactory,
  deps: [TaskRepository],
};

const CompleteTaskUseCaseFactory = (taskRepo: TaskRepository) =>
  new CompleteTaskUseCase(taskRepo);
export const CompleteTaskUseCaseProvider = {
  provide: CompleteTaskUseCase,
  useFactory: CompleteTaskUseCaseFactory,
  deps: [TaskRepository],
};

@NgModule({
  providers: [
    CreateTaskUseCaseProvider,
    DeleteTaskUseCaseProvider,
    GetTaskByIdUseCaseProvider,
    GetAllTasksUseCaseProvider,
    GetUnassignedTasksUseCaseProvider,
    GetTasksByUserIdUseCaseProvider,
    UpdateTaskUseCaseProvider,
    AssignTaskUseCaseProvider,
    CompleteTaskUseCaseProvider,
    { provide: TaskRepository, useClass: TaskImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class TaskModule {}
