import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sofka-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  //routes
  routeDashboard: string[];

  constructor() {
    this.routeDashboard = ['../../'];
  }
  ngOnInit(): void {
    // this.userModelData = localStorage.getItem('userData') as UserInterface;
    console.log('x');
  }
}
