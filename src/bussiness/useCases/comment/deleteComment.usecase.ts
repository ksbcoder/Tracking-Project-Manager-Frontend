import { Observable } from "rxjs";
import { UseCase } from "src/base/utils/IUseCase";
import { CommentRepository } from "src/bussiness/repositories/comment/comment.repository";
import { UpdateCommentDTO } from "src/domain/DTO/comment/updateCommentDTO";
import { updateUserUseCaseProvider } from '../../../data/repositories/user/user.module';

export class DeleteCommentUseCase
  implements UseCase<{ commentID: number, userID: string }, UpdateCommentDTO>
{
  constructor(private commentRepository: CommentRepository) { }

  execute(params: { commentID: number, userID: string }): Observable<UpdateCommentDTO> {
    return this.commentRepository.deleteCommentAsync(params);
  }
}
