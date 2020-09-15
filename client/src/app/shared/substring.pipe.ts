import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'substring'
})
export class SubStringPipe implements PipeTransform {

  transform(value: string, stringLength: number): string {
    return value.substr(0, stringLength) + '...';
  }

}
