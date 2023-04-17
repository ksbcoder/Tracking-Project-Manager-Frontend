import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserRoutingModule } from './user-routing.module';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { SharedModule } from 'src/presentation/shared/shared.module';

@NgModule({
  declarations: [ListUsersComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class UserModule {}
