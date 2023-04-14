import { Pipe, PipeTransform } from '@angular/core';
import {
  Phase,
  Roles,
  StateTask,
  StateInscription,
  Priority,
} from '../../../../base/utils/enums';

@Pipe({
  name: 'enumsNumberToStringPipe',
})
export class EnumsNumberToStringPipe implements PipeTransform {
  transform(
    value: Roles | Phase | StateTask | Priority | StateInscription,
    type: keyof EnumValues
  ): string {
    const values = ROLE_VALUES[type].split(',');
    return values[value] || '';
  }
}

export interface EnumValues {
  role: string;
  phase: string;
  stateTask: string;
  priority: string;
  stateInscription: string;
}

const ROLE_VALUES: EnumValues = {
  role: 'Default,Admin,Contributor',
  phase: 'Started,Completed,',
  stateTask: 'Active,Assigned,Completed,Deleted',
  priority: 'Low,Medium,High',
  stateInscription: 'Pending,Approved,Denied,Deleted',
};
