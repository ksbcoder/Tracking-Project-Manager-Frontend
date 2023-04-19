import { CommentRepository } from 'src/bussiness/repositories/comment/comment.repository';
import { DeleteCommentUseCase } from 'src/bussiness/useCases/comment/deleteComment.usecase';
import { GetAllCommentsByProjectIdUseCase } from 'src/bussiness/useCases/comment/getAllCommentsByProjectId.usecase';
import { CreateCommentUseCase } from '../../../bussiness/useCases/comment/createComment.usecase';
import { NgModule } from '@angular/core';
import { CommentImplementationRepository } from './comment-implementation.repository';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const CreateCommentUseCaseFactory = (commentRepo: CommentRepository) =>
  new CreateCommentUseCase(commentRepo);
export const CreateCommentUseCaseProvider = {
  provide: CreateCommentUseCase,
  useFactory: CreateCommentUseCaseFactory,
  deps: [CommentRepository],
};

const DeleteCommentUseCaseFactory = (commentRepo: CommentRepository) =>
  new DeleteCommentUseCase(commentRepo);
export const DeleteCommentUseCaseProvider = {
  provide: DeleteCommentUseCase,
  useFactory: DeleteCommentUseCaseFactory,
  deps: [CommentRepository],
};

const GetAllCommentsByProjectIdUseCaseFactory = (commentRepo: CommentRepository) =>
  new GetAllCommentsByProjectIdUseCase(commentRepo);
export const GetAllCommentsByProjectIdUseCaseProvider = {
  provide: GetAllCommentsByProjectIdUseCase,
  useFactory: GetAllCommentsByProjectIdUseCaseFactory,
  deps: [CommentRepository],
};

@NgModule({
  providers: [
    CreateCommentUseCaseProvider,
    DeleteCommentUseCaseProvider,
    GetAllCommentsByProjectIdUseCaseProvider,
    { provide: CommentRepository, useClass: CommentImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class CommentModule { }
