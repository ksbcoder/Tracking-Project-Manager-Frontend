import {
  Component,
  OnInit,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from '../../../core/security/services/userAuth/auth.service';
// import { StateService } from '../../../../shared/services/state.service';

@Component({
  selector: 'sofka-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routeDashboard: string[];
  routeAdd: string[];
  routeListUsers: string[];
  // state: boolean;
  userName!: string | null;

  constructor(
    private readonly auth$: AuthService // private readonly state$: StateService
  ) {
    this.routeDashboard = ['../projects'];
    this.routeListUsers = ['list-users'];
    this.routeAdd = ['add'];
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
  }

  logout(): void {
    this.auth$.SignOut();
  }
}
