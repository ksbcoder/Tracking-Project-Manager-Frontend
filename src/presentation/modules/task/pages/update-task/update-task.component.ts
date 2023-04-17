import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sofka-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
})
export class UpdateTaskComponent {
  //routes
  routeList: string[];

  //variables to emmit
  @Output() typeFormEmitted: EventEmitter<string> = new EventEmitter();
  formType!: string;

  constructor() {
    this.routeList = ['../../list'];
    this.typeFormEmitted.emit('update');
    this.formType = 'update';
  }
}
