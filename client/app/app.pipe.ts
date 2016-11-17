import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './objects/Book';

@Pipe({
  name: 'limitTo'
})
export class TruncatePipe {
  transform(value: string, args: string) : string {
    if(value == null){
    	return '';
    } else {
	    let limit = args ? parseInt(args, 10) : 10;
	    let trail = '...';

	    return value.length > limit ? value.substring(0, limit) + trail : value;
	}
  }
}

@Pipe({
    name: 'gridCategory',
    pure: false
})
export class GridCategoryPipe implements PipeTransform {
    transform(items: Book[], arg: string): any {
        if(!arg) {
           return items;
        } else {
          arg = arg.toLowerCase();
          return items.filter((item:Book) => item.genre.toLowerCase().indexOf(arg) !== -1)
        }
    }
}