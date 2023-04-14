import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { EnumsNumberToStringPipe } from './pipes/enums-number.pipe/enums-number-to-string.pipe';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';
import { NullValuesToShowPipe } from './pipes/null-show.pipe/null-values-to-show.pipe';

@NgModule({
  declarations: [
    EnumsNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
    AccessDeniedComponent,
    AppLayoutComponent,
    ShowForRolesDirective,
    NullValuesToShowPipe,
  ],
  exports: [
    EnumsNumberToStringPipe,
    BackButtonComponent,
    HeaderComponent,
    FooterComponent,
    AccessDeniedComponent,
    AppLayoutComponent,
    ShowForRolesDirective,
    NullValuesToShowPipe,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
