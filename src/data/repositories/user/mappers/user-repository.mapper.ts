import { Mapper } from 'src/base/utils/mapper';
import { NewUserDTO } from 'src/domain/DTO/user/newUserDTO';
import { UpdateUserDTO } from 'src/domain/DTO/user/updateUserDTO';
import { NewUserCommand } from 'src/domain/commands/user/newUserCommand';
import { UserModel } from 'src/domain/models/user/user.model';

// export class NewUserToUserRepositoryMapper extends Mapper<
//   NewUserDTO,
//   UserModel
// > {
//   mapFrom(param: NewUserDTO): UserModel {
//     return {
//       uidUser: param.uidUser,
//       userName: param.userName,
//       email: param.email,
//       efficiencyRate: param.efficiencyRate,
//       tasksCompleted: param.tasksCompleted,
//       role: param.role,
//       stateUser: param.stateUser,
//     };
//   }
//   mapTo(param: UserModel): NewUserDTO {
//     return {
//       UidUser: param.UidUser,
//       UserName: param.UserName,
//       Email: param.Email,
//       EfficiencyRate: param.EfficiencyRate,
//       TasksCompleted: param.TasksCompleted,
//       Role: param.Role,
//       StateUser: param.StateUser,
//     };
//   }
// }

// export class UpdateUserToUserRepositoryMapper extends Mapper<
//   UpdateUserDTO,
//   UserModel
// > {
//   mapFrom(param: UpdateUserDTO): UserModel {
//     return {
//       UserID: param.UserID,
//       UidUser: param.UidUser,
//       UserName: param.UserName,
//       Email: param.Email,
//       EfficiencyRate: param.EfficiencyRate,
//       TasksCompleted: param.TasksCompleted,
//       Role: param.Role,
//       StateUser: param.StateUser,
//     };
//   }
//   mapTo(param: UserModel): UpdateUserDTO {
//     return {
//       UserID: param.UserID,
//       UidUser: param.UidUser,
//       UserName: param.UserName,
//       Email: param.Email,
//       EfficiencyRate: param.EfficiencyRate,
//       TasksCompleted: param.TasksCompleted,
//       Role: param.Role,
//       StateUser: param.StateUser,
//     };
//   }
// }
