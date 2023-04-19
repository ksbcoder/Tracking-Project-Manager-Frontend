import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentRepository } from "src/bussiness/repositories/comment/comment.repository";
import { NewCommentDTO } from "src/domain/DTO/comment/newCommentDTO";
import { UpdateCommentDTO } from "src/domain/DTO/comment/updateCommentDTO";
import { NewCommentCommand } from "src/domain/commands/comment/newCommentCommand";
import { CommentModel } from "src/domain/models/comment/comment.modelt";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class CommentImplementationRepository extends CommentRepository {
  constructor(private http: HttpClient) {
    super();
  }

  createCommentAsync(comment: NewCommentCommand): Observable<NewCommentDTO> {
    return this.http.post<NewCommentDTO>(environment.urlApiProjects + 'Comment', comment);
  }

  deleteCommentAsync(params: { commentID: number, userID: string }): Observable<UpdateCommentDTO> {
    return this.http.delete<UpdateCommentDTO>(
      environment.urlApiProjects + 'Comment/ID?idComment=' + params.commentID + '&idUser=' + params.userID
    );
  }

  getAllCommentsByProjectIdAsync(projectID: string): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(
      environment.urlApiProjects + 'Comment/All/ProjectID?idProject=' + projectID
    );
  }
}
