import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateToRelativeTime'
})
export class DateToRelativeTimePipe implements PipeTransform {

  transform(date: Date): string {
    return moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow();
  }

}
