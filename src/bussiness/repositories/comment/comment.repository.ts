import { Observable } from "rxjs";
import { NewCommentDTO } from "src/domain/DTO/comment/newCommentDTO";
import { UpdateCommentDTO } from "src/domain/DTO/comment/updateCommentDTO";
import { NewCommentCommand } from "src/domain/commands/comment/newCommentCommand";
import { CommentModel } from "src/domain/models/comment/comment.modelt";

export abstract class CommentRepository {
  abstract createCommentAsync(comment: NewCommentCommand): Observable<NewCommentDTO>;

  abstract deleteCommentAsync(params: { commentID: number, userID: string }): Observable<UpdateCommentDTO>;

  abstract getAllCommentsByProjectIdAsync(projectID: string): Observable<CommentModel[]>;
}
