import { StateComment } from "src/base/utils/enums";

export class UpdateCommentDTO {
  commentID: number;
  uidUser: string;
  projectID: string;
  description: string;
  createdAt: Date;
  stateComment: StateComment

  constructor(
    commentID: number,
    uidUser: string,
    projectID: string,
    description: string,
    createdAt: Date,
    stateComment: StateComment
  ) {
    this.commentID = commentID;
    this.uidUser = uidUser;
    this.projectID = projectID;
    this.description = description;
    this.createdAt = createdAt;
    this.stateComment = stateComment;
  }
}
