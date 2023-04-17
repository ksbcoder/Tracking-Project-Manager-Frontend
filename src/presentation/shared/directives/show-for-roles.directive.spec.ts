import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ShowForRolesDirective } from './show-for-roles.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <div #container>
      <div *sofkaShowForRoles="[1]">Admin content</div>
      <div *sofkaShowForRoles="[2]">User content</div>
    </div>
  `,
})
class TestComponent {
  @ViewChild('container', { static: true })
  container: any;
}

describe('ShowForRolesDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ShowForRolesDirective],
      providers: [
        {
          provide: ViewContainerRef, useValue: {
            createEmbeddedView: () => { },
            clear: () => { }
          }
        },
        {
          provide: TemplateRef, useValue: {
            createEmbeddedView: () => { },
            clear: () => { }
          }
        }
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create an instance and show content for Admin', () => {
    // Set user role in localStorage to 'Adimn'
    localStorage.setItem('role', '1');

    fixture.detectChanges();
    expect(testComponent.container.nativeElement.innerHTML).toContain(
      'Admin content'
    );
  });

  it('should create an instance and show content for User', () => {
    // Set user role in localStorage to 'User'
    localStorage.setItem('role', '2');

    fixture.detectChanges();
    expect(testComponent.container.nativeElement.innerHTML).toContain(
      'User content'
    );
  });
});
