import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserModule } from 'src/data/repositories/user/user.module';
import { ProjectModule } from 'src/data/repositories/project/project.module';
import { InscriptionModule } from 'src/data/repositories/inscription/inscription.module';
import { TaskModule } from 'src/data/repositories/task/task.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/presentation/core/security/pages/login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    CommonModule,
    UserModule,
    ProjectModule,
    InscriptionModule,
    TaskModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
