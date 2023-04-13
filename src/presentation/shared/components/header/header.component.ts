import {
  Component,
  OnInit,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from '../../../core/security/services/userAuth/auth.service';
import { Router } from '@angular/router';
import { Roles } from 'src/base/utils/enums';
import { allowedRoles } from '../../guards/admin-role.guard';
// import { StateService } from '../../../../shared/services/state.service';

@Component({
  selector: 'sofka-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routeListUsers: string[];
  routeListProjects: string[];
  role: Roles;
  allowToShow: boolean;
  // state: boolean;
  userName!: string | null;

  constructor(
    private readonly auth$: AuthService,
    private router: Router // private readonly state$: StateService
  ) {
    this.routeListUsers = ['users/list'];
    this.routeListProjects = ['projects/list'];
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    this.allowToShow = false;
    // this.state = this.state$.State;
  }

  // changeState(): void {
  //   this.state$.State = true;
  //   this.state = this.state$.State;
  // }

  ngOnInit(): void {
    if (localStorage.getItem('userName') !== null) {
      // this.changeState();
      this.userName = localStorage.getItem('userName');
    }
    if (allowedRoles([this.role])) {
      this.allowToShow = true;
    }
  }

  logout(): void {
    this.auth$.SignOut();
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
