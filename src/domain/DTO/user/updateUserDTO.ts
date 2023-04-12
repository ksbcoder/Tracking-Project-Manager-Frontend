import { Roles, StateUser } from 'src/base/utils/enums';

export class UpdateUserDTO {
  UserID?: string;
  UidUser: string;
  UserName: string;
  Email: string;
  EfficiencyRate?: number;
  TasksCompleted?: number;
  Role?: Roles;
  StateUser?: StateUser;

  constructor(
    uidUser: string,
    userName: string,
    email: string,
    efficiencyRate?: number,
    tasksCompleted?: number,
    role?: Roles,
    stateUser?: StateUser
  ) {
    this.UidUser = uidUser;
    this.UserName = userName;
    this.Email = email;
    this.EfficiencyRate = efficiencyRate;
    this.TasksCompleted = tasksCompleted;
    this.Role = role;
    this.StateUser = stateUser;
  }
}
