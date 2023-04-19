import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserModule } from 'src/data/repositories/user/user.module';
import { ProjectModule } from 'src/data/repositories/project/project.module';
import { InscriptionModule } from 'src/data/repositories/inscription/inscription.module';
import { TaskModule } from 'src/data/repositories/task/task.module';
import { CommentModule } from 'src/data/repositories/comment/comment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/presentation/core/security/pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    CommonModule,
    UserModule,
    ProjectModule,
    InscriptionModule,
    TaskModule,
    CommentModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
