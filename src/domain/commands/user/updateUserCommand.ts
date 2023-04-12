import { Roles, StateUser } from 'src/base/utils/enums';

export class UpdateUserCommand {
  UserName: string;
  Email: string;
  EfficiencyRate: number;
  TasksCompleted: number;
  Role: Roles;
  StateUser: StateUser;

  constructor(
    userName: string,
    email: string,
    efficiencyRate: number,
    tasksCompleted: number,
    role: Roles,
    stateUser: StateUser
  ) {
    this.UserName = userName;
    this.Email = email;
    this.EfficiencyRate = efficiencyRate;
    this.TasksCompleted = tasksCompleted;
    this.Role = role;
    this.StateUser = stateUser;
  }

  getData(): {
    UserName: string;
    Email: string;
    EfficiencyRate: number;
    TasksCompleted: number;
    Role: Roles;
    StateUser: StateUser;
  } {
    return {
      UserName: this.UserName,
      Email: this.Email,
      EfficiencyRate: this.EfficiencyRate,
      TasksCompleted: this.TasksCompleted,
      Role: this.Role,
      StateUser: this.StateUser,
    };
  }
}
