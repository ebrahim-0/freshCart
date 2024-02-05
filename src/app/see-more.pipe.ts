import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore',
})
export class SeeMorePipe implements PipeTransform {
  transform(str: string, limit: number): string {
    return str.slice(0, limit);
  }
}
