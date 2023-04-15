import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscriptionsComponent } from './list-inscriptions.component';

describe('ListInscriptionsComponent', () => {
  let component: ListInscriptionsComponent;
  let fixture: ComponentFixture<ListInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInscriptionsComponent ]
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
