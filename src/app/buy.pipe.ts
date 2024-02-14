import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy',
})
export class BuyPipe implements PipeTransform {
  transform(productName: string): string {
    return `Buy ${productName}`;
  }
}
