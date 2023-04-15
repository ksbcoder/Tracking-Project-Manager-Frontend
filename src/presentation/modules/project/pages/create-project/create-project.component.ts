import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sofka-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent {
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
