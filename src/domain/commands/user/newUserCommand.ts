export class NewUserCommand {
  UidUser: string;
  UserName: string;
  Email: string;

  constructor(uidUser: string, userName: string, email: string) {
    this.UidUser = uidUser;
    this.UserName = userName;
    this.Email = email;
  }
}
