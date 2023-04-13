import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { RoleNumberToStringPipe } from './pipes/role-number.pipe/role-number-to-string.pipe';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RoleNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    RoleNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
