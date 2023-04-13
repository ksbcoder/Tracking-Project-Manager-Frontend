import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserRoutingModule } from './user-routing.module';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { SharedModule } from 'src/presentation/shared/shared.module';

@NgModule({
  declarations: [ListUsersComponent, UpdateUserComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
})
export class UserModule {}
