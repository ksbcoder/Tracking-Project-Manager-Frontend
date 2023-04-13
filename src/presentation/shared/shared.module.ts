import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { RoleNumberToStringPipe } from './pipes/role-number.pipe/role-number-to-string.pipe';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';

@NgModule({
  declarations: [
    RoleNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
    AccessDeniedComponent,
    AppLayoutComponent,
    ShowForRolesDirective,
  ],
  exports: [
    RoleNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
    AccessDeniedComponent,
    AppLayoutComponent,
    ShowForRolesDirective,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
