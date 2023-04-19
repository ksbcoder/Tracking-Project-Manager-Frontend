import { StateComment } from "src/base/utils/enums";

export class NewCommentDTO {
  uidUser: string;
  projectID: string;
  description: string;
  createdAt: Date;
  stateComment: StateComment

  constructor(
    uidUser: string,
    projectID: string,
    description: string,
    createdAt: Date,
    stateComment: StateComment
  ) {
    this.uidUser = uidUser;
    this.projectID = projectID;
    this.description = description;
    this.createdAt = createdAt;
    this.stateComment = stateComment;
  }
}
