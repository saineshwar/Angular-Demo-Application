import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ng2YaTableService } from './ng2-ya-table.service';
import { ColumnState } from './ng2-ya-table-interfaces';

@Component({
  selector: 'ng2-ya-table-filter-list',
  template: `
    <select class="form-control" style="width: 100%"
        [(ngModel)]="column.filterValue"
        (ngModelChange)="state.changeFilter(column)">
          <option value="">{{ column.def.filter.config.nullText }}</option>
          <option *ngFor="let item of column.def.filter.config.list" [value]="item.value">{{item.text}}</option>
    </select>`
})
export class Ng2YaTableFilteringListComponent {
  constructor(private state : Ng2YaTableService) {}
  
  @Input() public column: ColumnState;
}