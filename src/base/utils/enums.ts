//user enums
export enum StateUser {
  Active = 0,
  Inactive = 1,
  Eliminated = 2,
}

export enum Roles {
  Default = 0,
  Admin = 1,
  Contributor = 2,
}

//project enums
export enum StateProject {
  Active = 0,
  Inactive = 1,
  Deleted = 2,
}

export enum Phase {
  Started = 0,
  Completed = 1,
}

export enum StateTask {
  Active = 0,
  Assigned = 1,
  Completed = 2,
  Deleted = 3,
}

export enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export enum StateInscription {
  Pending = 0,
  Approved = 1,
  Denied = 2,
  Deleted = 3,
}

export enum StateComment {
  Active = 0,
  Deleted = 1,
}
