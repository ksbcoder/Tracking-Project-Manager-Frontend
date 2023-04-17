import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/presentation/shared/shared.module';
import { ListInscriptionsComponent } from './pages/list-inscriptions/list-inscriptions.component';
import { InscriptionRoutingModule } from './inscription-routing.module';

@NgModule({
  declarations: [ListInscriptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class InscriptionModule {}
