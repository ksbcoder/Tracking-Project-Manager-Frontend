import { ActivatedRoute } from '@angular/router';
import { GetProjectByIdUseCase } from 'src/bussiness/useCases/project/getProjectById.usecase';
import { GetUserByIdUseCase } from 'src/bussiness/useCases/user/getUserById.usecase';
import { ProjectModel } from 'src/domain/models/project/project.model';
import { UserModel } from 'src/domain/models/user/user.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from 'src/domain/models/comment/comment.modelt';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetAllCommentsByProjectIdUseCase } from 'src/bussiness/useCases/comment/getAllCommentsByProjectId.usecase';
import * as moment from 'moment';
import { DeleteCommentUseCase } from 'src/bussiness/useCases/comment/deleteComment.usecase';
import { NewCommentCommand } from 'src/domain/commands/comment/newCommentCommand';
import { CreateCommentUseCase } from '../../../../../bussiness/useCases/comment/createComment.usecase';
import { getUserByIdUseCaseProvider } from '../../../../../data/repositories/user/user.module';

@Component({
  selector: 'sofka-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.scss'],
})
export class GetProjectComponent implements OnInit {
  //routes
  routeList: string[];

  //variables
  render!: boolean;
  commentsEmpty!: boolean;
  nameProject!: string;
  project!: ProjectModel;
  leader!: UserModel;
  createdAt!: string;
  openDate!: string;
  deadLine!: string;
  completedAt!: string;

  //variables comments
  comments!: CommentModel[];
  frmComment!: FormGroup;
  commentToCreate!: NewCommentCommand;
  user!: UserModel;
  uidUser: string;

  constructor(
    private getProjectById: GetProjectByIdUseCase,
    private getLeaderById: GetUserByIdUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getAllCommentsByProjectId: GetAllCommentsByProjectIdUseCase,
    private createCommentUseCase: CreateCommentUseCase,
    private deleteCommentUseCase: DeleteCommentUseCase,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.routeList = ['../../list'];
    this.commentsEmpty = true;
    this.uidUser = localStorage.getItem('uidUser') as string;
    this.getUser(this.uidUser);
    this.getProject();
    setTimeout(() => {
      this.getLeader(this.project.leaderID);
    }, 200);
    setTimeout(() => {
      this.render = true;
    }, 1500);
    this.frmComment = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getComments(this.project.projectID);
    }, 200);
  }

  //#region comments
  sendComment(projectID: string): void {
    this.commentToCreate = {
      uidUser: this.uidUser,
      projectID: projectID,
      description:
        this.user.userName + ': ' + this.frmComment.get('description')?.value,
    };
    let subCreate = this.createCommentUseCase
      .execute(this.commentToCreate)
      .subscribe({
        next: (data) => {
          this.toastr.success('Comment created successfully.', '', {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Comment was no created', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
        complete: () => {
          subCreate.unsubscribe();
        },
      });
  }

  deleteComment(commentID: number): void {
    let userID = localStorage.getItem('uidUser') as string;
    let subDelete = this.deleteCommentUseCase
      .execute({ commentID: commentID, userID: userID })
      .subscribe({
        next: (data) => {
          this.toastr.success('Comment deleted successfully', '', {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Error deleting the comment', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
          this.toastr.warning('You can only delete your own comments', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
        complete: () => {
          subDelete.unsubscribe();
        },
      });
  }

  //#endregion

  //#region consults
  getLeader(uidUser: string): void {
    let subGet = this.getLeaderById.execute(uidUser).subscribe({
      next: (data) => (this.leader = data),
      error: (err) => console.log(err),
      complete: () => {
        subGet.unsubscribe();
      },
    });
  }

  getUser(uidUser: string): void {
    let subGet = this.getUserByIdUseCase.execute(uidUser).subscribe({
      next: (data) => (this.user = data),
      error: (err) => console.log(err),
      complete: () => {
        subGet.unsubscribe();
      },
    });
  }

  getProject(): void {
    let subUpdate: any;
    let subParams = this.route.params.subscribe((params) => {
      subUpdate = this.getProjectById.execute(params['id']).subscribe({
        next: (data) => {
          (this.project = data),
            (this.createdAt = this.dateToString(data.createdAt)),
            (this.openDate = this.dateToString(data.openDate)),
            (this.deadLine = this.dateToString(data.deadLine)),
            (this.completedAt = this.dateToString(data.completedAt));
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Error consulting the project', '', {
            timeOut: 3500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        },
        complete: () => {
          subParams.unsubscribe(), subUpdate.unsubscribe();
        },
      });
    });
  }

  getComments(projectID: string): void {
    let subGet = this.getAllCommentsByProjectId.execute(projectID).subscribe({
      next: (data) => {
        (this.comments = data), (this.commentsEmpty = false);
      },
      error: (err) => {
        console.log(err),
          this.toastr.info('No comments available.', '', {
            timeOut: 2500,
            positionClass: 'toast-bottom-right',
            closeButton: true,
          });
        this.commentsEmpty = true;
      },
      complete: () => {
        subGet.unsubscribe();
      },
    });
  }
  //#endregion

  dateToString(date: Date): string {
    return date ? new Date(date).toISOString().substring(0, 10) : '';
  }
}
