import { Directive, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Ng2YaTableService } from './ng2-ya-table.service';
import { ColumnState } from './ng2-ya-table-interfaces';

@Directive({selector: '[ngTableSorting]'})
export class Ng2YaTableSortingDirective {

  public constructor(private state: Ng2YaTableService) { }

  @Input('ngTableSorting') 
  public column: ColumnState;

  @HostListener('click', ['$event'])
  public onToggleSort(event:any):void {
    if (event) {
      event.preventDefault();
    }
    this.state.toggleSort(this.column, event.shiftKey && this.state.orderMulti);
  }

  @HostListener('mousedown', ['$event'])
  public onDisableMouseDown(event:any):void {
    if (event) {
      event.preventDefault();
    }
  }
}