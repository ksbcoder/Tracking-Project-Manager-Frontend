import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { CommentRepository } from "src/bussiness/repositories/comment/comment.repository";
import { CommentModel } from "src/domain/models/comment/comment.modelt";

export class GetAllCommentsByProjectIdUseCase implements UseCase<string, CommentModel[]> {
  constructor(private commentRepository: CommentRepository) { }

  execute(projectID: string): Observable<CommentModel[]> {
    return this.commentRepository.getAllCommentsByProjectIdAsync(projectID);
  }
}
