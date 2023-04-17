import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/base/utils/enums';

@Component({
  selector: 'sofka-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  allowToAccess: boolean;
  role?: number;
  constructor() {
    this.allowToAccess = true;
    this.role = parseInt(localStorage.getItem('role') ?? '0');
  }

  ngOnInit() {
    if (this.role === Roles.Default) {
      this.allowToAccess = false;
    }
  }
}
