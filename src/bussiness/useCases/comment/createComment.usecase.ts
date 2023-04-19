import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { CommentRepository } from "src/bussiness/repositories/comment/comment.repository";
import { NewCommentDTO } from "src/domain/DTO/comment/newCommentDTO";
import { NewCommentCommand } from "src/domain/commands/comment/newCommentCommand";

export class CreateCommentUseCase implements UseCase<NewCommentCommand, NewCommentDTO> {
  constructor(private commentRepository: CommentRepository) {
  }
  execute(comment: NewCommentCommand): Observable<NewCommentDTO> {
    return this.commentRepository.createCommentAsync(comment);
  }
}
