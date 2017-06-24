import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ITableOptions, ITablePaging, ITableColumn, ColumnState, PagingState, SORT_ORDER } from './ng2-ya-table-interfaces';
import { Languages } from './ng2-ya-table-languages';

const sortCycle : SORT_ORDER[] = ['asc', 'desc', null];
const getNextSortOrder : Function = function(currentSortOrder : SORT_ORDER) : SORT_ORDER {
  let nextIndex : number = (sortCycle.indexOf(currentSortOrder) + 1) % sortCycle.length;
  return sortCycle[nextIndex];
};

@Injectable()
export class Ng2YaTableService {
  private stateChangedSource : BehaviorSubject<Ng2YaTableService> = new BehaviorSubject<Ng2YaTableService>(this);
  
  stateChanged$: Observable<Ng2YaTableService>;
  showFilterRow: boolean = false;
  orderMulti: boolean = true;
  columns: ColumnState[];
  paging: PagingState;
  sortStack: ColumnState[] = [];
  fullTextFilter: string;
  language: any = null;

  constructor() {
    this.stateChanged$ = this.stateChangedSource.asObservable();
  }

  public setOptions(options: ITableOptions): void{
    this.orderMulti = !!options.orderMulti ? options.orderMulti : true;
    this.language = typeof options.language ==="string" ? Languages[options.language] : options.language;
  }

  public setColumns (columns : Array<ITableColumn>): void {
    this.columns = columns.map(c => {
      if (!!c.filter) {
        this.showFilterRow = true;
      }

      let column: ColumnState = {
        filterValue: null,
        sortOrder: c.defaultSortOrder,
        def: c,
        hasSort: c.sort,
        hasFilter: !!c.filter
      };

      if(!!column.sortOrder){
        this.sortStack.push(column);
      }

      return column;
    });
  }

  public setPaging(paging: ITablePaging): void {
    this.paging = {
      currentPage: 1,
      itemsPerPage: paging.itemsPerPage,
      recordsTotal : 0,
      recordsFiltered: 0
    };
  }

  public toggleSort(colState : ColumnState, orderMulti : boolean): void {
    colState.sortOrder = getNextSortOrder(colState.sortOrder);

    if (orderMulti) {
      let curIndex : number = this.sortStack.indexOf(colState);
      if (curIndex === -1) {
        this.sortStack.push(colState);
      } else if (!colState.sortOrder) {
        this.sortStack.splice(curIndex, 1);
      }
    } else {
      this.sortStack = colState.sortOrder ? [colState] : [];
      this.columns.forEach((column) => {
        if (column !== colState) {
          column.sortOrder = null;
        }
      });
    }

    this.notify();
  }

  public changePaging(page: number, itemsPerPage: number){
      this.paging.currentPage = page;
      this.paging.itemsPerPage = itemsPerPage;
      this.notify();
  }

  public changeFilter(column: ColumnState){
    this.paging.currentPage = 1;
    this.notify();
  }

  public notify () : void {
    this.stateChangedSource.next(this);
  }
}
