import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonComponent } from './back-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared.module';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackButtonComponent],
      imports: [
        SharedModule
      ],
      providers: [{
        provide: Router, useValue: {
          navigate: () => {
            return {
              subscribe: () => { }
            }
          }
        }
      },
      {
        provide: ActivatedRoute, useValue: {
          snapshot: {}
        }
      }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
