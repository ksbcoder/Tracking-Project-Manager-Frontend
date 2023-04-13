import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../../../../base/utils/enums';

@Pipe({
  name: 'roleNumberToString',
})
export class RoleNumberToStringPipe implements PipeTransform {
  role!: string;
  transform(value: Roles): string {
    switch (value) {
      case 0:
        this.role = 'Default';
        break;
      case 1:
        this.role = 'Admin';
        break;
      case 2:
        this.role = 'Contributor';
        break;
      default:
        break;
    }
    return this.role;
  }
}
