import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import "rxjs/Rx";
import { Ng2YaTableService } from './ng2-ya-table.service';
import { ColumnState } from './ng2-ya-table-interfaces';

@Component({
  selector: 'ng2-ya-table-filter-default',
  template: `
    <input class="form-control" style="width: 100%"
      [attr.type]="column.def.filter.config && column.def.filter.config.type ? column.def.filter.config.type : 'text'"
      [attr.placeholder]="column.def.filter.config && column.def.filter.config.placeholder ? column.def.filter.config.placeholder : ''"
      [attr.max]="column.def.filter.config && column.def.filter.config.max ? column.def.filter.config.max : 524288"
      [attr.min]="column.def.filter.config && column.def.filter.config.min ? column.def.filter.config.min : 0"
      [attr.step]="column.def.filter.config && column.def.filter.config.step ? column.def.filter.config.step : 1"
      [(ngModel)]="column.filterValue"
      (ngModelChange)="onFilterValueChange($event)" />`
})
export class Ng2YaTableFilteringDefaultComponent {
  filterValueChanged: Subject<any> = new Subject<any>();

  constructor(private state : Ng2YaTableService) {
    this.filterValueChanged
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(filterValue => this.state.changeFilter(this.column));
  }
  
  @Input() public column: ColumnState;

  onFilterValueChange(event: any){
    this.filterValueChanged.next(event)
  }
}