import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sofka-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent {
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
