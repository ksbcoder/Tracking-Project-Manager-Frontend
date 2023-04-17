import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sofka-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  //routes
  routeList: string[];

  //variables to emmit
  @Output() typeFormEmitted: EventEmitter<string> = new EventEmitter();
  formType!: string;

  constructor() {
    this.routeList = ['../list'];
    this.typeFormEmitted.emit('create');
    this.formType = 'create';
  }
}
