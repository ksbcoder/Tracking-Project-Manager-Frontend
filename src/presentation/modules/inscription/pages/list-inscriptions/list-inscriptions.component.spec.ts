import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscriptionsComponent } from './list-inscriptions.component';
import { GetInscriptionsNoRespondedUseCase } from 'src/bussiness/useCases/inscription/getInscriptionsNoResponded.usecase';
import { RespondInscriptionUseCase } from 'src/bussiness/useCases/inscription/respondInscription.usecase';
import { DeleteInscriptionUseCase } from 'src/bussiness/useCases/inscription/deleteInscription.usecase';
import { ToastrService } from 'ngx-toastr';

describe('ListInscriptionsComponent', () => {
  let component: ListInscriptionsComponent;
  let fixture: ComponentFixture<ListInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListInscriptionsComponent],
      providers: [
        {
          provide: GetInscriptionsNoRespondedUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: RespondInscriptionUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: DeleteInscriptionUseCase, useValue: {
            execute: () => { }
          }
        },
        {
          provide: ToastrService, useValue: {
            success: () => { }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
