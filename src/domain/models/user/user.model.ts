import { Roles, StateUser } from 'src/base/utils/enums';

export class UserModel {
  userID: string;
  uidUser: string;
  userName: string;
  email: string;
  efficiencyRate: number;
  tasksCompleted: number;
  role: Roles;
  stateUser: StateUser;

  constructor(
    userID: string,
    uidUser: string,
    userName: string,
    email: string,
    efficiencyRate: number,
    tasksCompleted: number,
    role: Roles,
    stateUser: StateUser
  ) {
    this.userID = userID;
    this.uidUser = uidUser;
    this.userName = userName;
    this.email = email;
    this.efficiencyRate = efficiencyRate;
    this.tasksCompleted = tasksCompleted;
    this.role = role;
    this.stateUser = stateUser;
  }

  // getdata() {
  //   return {
  //     userID: this.userID,
  //     uidUser: this.uidUser,
  //     userName: this.userName,
  //     email: this.email,
  //     efficiencyRate: this.efficiencyRate,
  //     tasksCompleted: this.tasksCompleted,
  //     role: this.role,
  //     stateUser: this.stateUser,
  //   };
  // }
}
