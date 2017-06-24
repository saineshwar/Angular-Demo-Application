import { Pipe, PipeTransform } from '@angular/core';
import { CarModel } from '../Cars/Car.Model'
@Pipe({
    name: 'carfilter',
    pure: false
})
export class CarFilterPipe implements PipeTransform
{
    transform(items: any[], filter: CarModel): any
    {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => item.title.indexOf(filter.Model_Name) !== -1);
    }
}