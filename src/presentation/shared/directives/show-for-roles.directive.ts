import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { Roles } from 'src/base/utils/enums';

@Directive({
  selector: '[sofkaShowForRoles]',
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input('sofkaShowForRoles') allowedRoles?: Roles[];
  allowToShow = false;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnDestroy(): void {
    this.allowToShow = false;
  }
  ngOnInit(): void {
    const userRole = parseInt(localStorage.getItem('role') ?? '0');
    this.allowToShow = Boolean(
      userRole && this.allowedRoles?.includes(userRole)
    );
    distinctUntilChanged();
    this.allowToShow
      ? this.viewContainerRef.createEmbeddedView(this.templateRef)
      : this.viewContainerRef.clear();
  }
}
