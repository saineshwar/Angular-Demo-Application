import { Component, EventEmitter, Input, Output, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription }   from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { IDatasourceOrder, IDatasourceFilter, IDatasourceParameters, IDatasourceResult, ITableDataSource, ITableOptions, ITableColumn, ITablePaging, ColumnState } from './ng2-ya-table-interfaces';
import { Ng2YaTableService } from './ng2-ya-table.service';

@Component({
  selector: 'ng2-ya-table',
  template: `
    <div class="ng2-ya-table_wrapper form-inline dt-bootstrap no-footer">
      <div class="row">
        <div class="col-md-6">
          <div class="ng2-ya-table_length">
            <label>
              <span *ngFor="let s of state.language.lengthMenu.split(' ')">
                <span [ngSwitch]="s">
                  <select *ngSwitchCase="'_MENU_'" class="form-control input-sm" [(ngModel)]="state.paging.itemsPerPage" (change)="state.changePaging(1, $event.target.value)">
                    <option *ngFor="let pn of paging.itemsPerPageOptions" [value]="pn">{{pn}}</option>
                  </select>
                  <span *ngSwitchDefault>{{s}}</span>
                </span>
              </span>
            </label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="ng2-ya-table_filter">
            <label>
              <span>{{state.language.search}}</span>
              <input type="search" class="form-control input-sm"
                [(ngModel)]="state.fullTextFilter"
                (ngModelChange)="onFullTextFilterValueChange($event)"/>
            </label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div *ngIf="processing" class="ng2-ya-table_processing panel panel-default">{{state.language.processing}}</div>
          <table class="table ng2-ya-table no-footer" ngClass="{{options.className || ''}}" role="grid" style="width: 100%;">
            <thead>
              <tr role="row">
                <th *ngFor="let column of state.columns" 
                  [style.width]="column.def.width"
                  [ngClass]="{'sorting_desc': column.sortOrder === 'desc', 'sorting_asc': column.sortOrder === 'asc', 'sorting': column.hasSort }"
                  [ngTableSorting]="column">
                  {{column.def.title}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="state.showFilterRow">
                <td *ngFor="let column of state.columns">
                  <div *ngIf="column.def.filter" [ngSwitch]="column.def.filter.controlType">
                    <ng2-ya-table-filter-list *ngSwitchCase="'list'" [column]="column"></ng2-ya-table-filter-list>
                    <ng2-ya-table-filter-default *ngSwitchDefault [column]="column"></ng2-ya-table-filter-default>
                  </div>
                </td>
              </tr>
              <tr *ngFor="let row of rows">
                <td (click)="cellClick(row, column)" *ngFor="let column of columns" [innerHtml]="sanitize(getHtml(row, column))"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div *ngIf="rows.length > 0" class="ng2-ya-table_info" role="status">
            <span *ngFor="let s of state.language.info.split(' ')">
              <span [ngSwitch]="s">
                <span *ngSwitchCase="'_START_'">{{(state.paging.currentPage - 1) * state.paging.itemsPerPage + 1}}</span>
                <span *ngSwitchCase="'_END_'">{{(state.paging.currentPage - 1) * state.paging.itemsPerPage + rows.length}}</span>
                <span *ngSwitchCase="'_TOTAL_'">{{state.paging.recordsFiltered}}</span>
                <span *ngSwitchDefault>{{s}}</span>
              </span>
            </span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="ng2-ya-table_paginate paging_simple_numbers">
            <pagination *ngIf="rows.length > 0"
              [(ngModel)]="state.paging.currentPage"
              [totalItems]="state.paging.recordsFiltered"
              [itemsPerPage]="state.paging.itemsPerPage"
              [maxSize]="paging.maxSize"
              [boundaryLinks]="false"
              [rotate]="false"
              (pageChanged)="state.changePaging($event.page, $event.itemsPerPage)"
              [firstText] = "state.language.pagination.first"
              [lastText] = "state.language.pagination.last"
              [nextText] = "state.language.pagination.next"
              [previousText] = "state.language.pagination.previous">
            </pagination>
          </div>
        </div>
      </div>
    </div>`,
  styles: [
    `table.ng2-ya-table {
      clear: both;
      margin-top: 6px !important;
      margin-bottom: 6px !important;
      max-width: none !important;
      border-collapse: separate !important;
    }`,
    `table.ng2-ya-table td,
    table.ng2-ya-table th {
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
    }`,
    `table.ng2-ya-table td.ng2-ya-table_empty,
    table.ng2-ya-table th.ng2-ya-table_empty {
      text-align: center;
    }`,
    `table.ng2-ya-table.nowrap th,
    table.ng2-ya-table.nowrap td {
      white-space: nowrap;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_length label {
      font-weight: normal;
      text-align: left;
      white-space: nowrap;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_length select {
      width: 75px;
      display: inline-block;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_filter {
      text-align: right;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_filter label {
      font-weight: normal;
      white-space: nowrap;
      text-align: left;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_filter input {
      margin-left: 0.5em;
      display: inline-block;
      width: auto;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_info {
      padding-top: 8px;
      white-space: nowrap;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_paginate {
      margin: 0;
      white-space: nowrap;
      text-align: right;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_paginate ul.pagination {
      margin: 2px 0;
      white-space: nowrap;
    }`,
    `div.ng2-ya-table_wrapper div.ng2-ya-table_processing {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200px;
      margin-left: -100px;
      margin-top: -26px;
      text-align: center;
      padding: 1em 0;
    }`,
    `table.ng2-ya-table thead > tr > th.sorting_asc, 
    table.ng2-ya-table thead > tr > th.sorting_desc, 
    table.ng2-ya-table thead > tr > th.sorting,
    table.ng2-ya-table thead > tr > td.sorting_asc,
    table.ng2-ya-table thead > tr > td.sorting_desc,
    table.ng2-ya-table thead > tr > td.sorting {
      padding-right: 30px;
    }`,
    `table.ng2-ya-table thead > tr > th:active,
    table.ng2-ya-table thead > tr > td:active {
      outline: none;
    }`,
    `table.ng2-ya-table thead .sorting,
    table.ng2-ya-table thead .sorting_asc,
    table.ng2-ya-table thead .sorting_desc,
    table.ng2-ya-table thead .sorting_asc_disabled,
    table.ng2-ya-table thead .sorting_desc_disabled {
      cursor: pointer;
      position: relative;
    }`,
    `table.ng2-ya-table thead .sorting:after,
    table.ng2-ya-table thead .sorting_asc:after,
    table.ng2-ya-table thead .sorting_desc:after,
    table.ng2-ya-table thead .sorting_asc_disabled:after,
    table.ng2-ya-table thead .sorting_desc_disabled:after {
      position: absolute;
      bottom: 8px;
      right: 8px;
      display: block;
      font-family: 'Glyphicons Halflings';
      opacity: 0.5;
    }`,
    `table.ng2-ya-table thead .sorting:after {
      opacity: 0.2;
      content: "\\e150";
      /* sort */
    }`,
    `table.ng2-ya-table thead .sorting_asc:after {
      content: "\\e155";
      /* sort-by-attributes */
    }`,
    `table.ng2-ya-table thead .sorting_desc:after {
      content: "\\e156";
      /* sort-by-attributes-alt */
    }`,
    `table.ng2-ya-table thead .sorting_asc_disabled:after,
    table.ng2-ya-table thead .sorting_desc_disabled:after {
      color: #eee;
    }`,
    `@media screen and (max-width: 767px) {
      div.ng2-ya-table_wrapper div.ng2-ya-table_length,
      div.ng2-ya-table_wrapper div.ng2-ya-table_filter,
      div.ng2-ya-table_wrapper div.ng2-ya-table_info,
      div.ng2-ya-table_wrapper div.ng2-ya-table_paginate {
        text-align: center;
      }
    }`],
  providers: [Ng2YaTableService]
})
export class Ng2YaTableComponent implements OnChanges, OnDestroy, OnInit {
  private subscription : Subscription;
  private fullTextFilterValueChanged: Subject<string> = new Subject<string>();

  processing:boolean = false;
  @Input() options: ITableOptions = null;
  @Input() rows:Array<any> | ITableDataSource = [];
  @Input() datasource: ITableDataSource = null;
  @Input() columns: Array<ITableColumn> = [];
  @Input() paging: ITablePaging = null;

  public constructor(private sanitizer:DomSanitizer, private state: Ng2YaTableService) { 
    this.fullTextFilterValueChanged
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(filterValue => this.onChangeTable());
  }

  ngOnInit() {
    this.subscription = this.state.stateChanged$.subscribe(() => this.onChangeTable());
  }

  ngOnChanges (changes: SimpleChanges) : void {
    if (changes['options'].isFirstChange()) {
      this.state.setOptions(changes['options'].currentValue);
    }
    if (changes['paging'].isFirstChange()) {
      this.state.setPaging(changes['paging'].currentValue);
    }
    if (changes['columns'].isFirstChange()) {
      this.state.setColumns(changes['columns'].currentValue);
    }
  }

  ngOnDestroy () : void {
    this.subscription.unsubscribe();
  }

  public sanitize(html:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public onChangeTable():void {
    if(this.datasource)
    {
      this.processing = true;

      let orders: Array<IDatasourceOrder> = new Array<IDatasourceOrder>();
      this.state.sortStack.forEach((column:ColumnState) => {
        let order: IDatasourceOrder = {
          dir: column.sortOrder,
          name: column.def.name
        };
        orders.push(order);
      });

      let filters: Array<IDatasourceFilter> = new Array<IDatasourceFilter>();
      this.state.columns.forEach((column: ColumnState) => {
        if(column.hasFilter) {
          let filter: IDatasourceFilter = {
            name: column.def.name,
            type: column.def.filter.type,
            value: column.filterValue
          };
          filters.push(filter);
        }
      });

      let request: IDatasourceParameters = { 
        start: (this.state.paging.currentPage - 1) * this.state.paging.itemsPerPage, 
        length: this.state.paging.itemsPerPage,
        filters: filters,
        orders: orders,
        fullTextFilter: this.state.fullTextFilter
      };

      this.datasource(request).subscribe(
          (result: IDatasourceResult) => {
            this.rows = result.data;
            this.state.paging.recordsFiltered = result.recordsFiltered;
            this.state.paging.recordsTotal = result.recordsTotal;
          },
          error => {
            console.log(error);
          },
          () => {
            this.processing = false;
          }
      );
    }
  }

  public getHtml(row:any, column:ITableColumn): string {
    if(column.render){
      let data: any = this.getData(row, column.name);
      return column.render(data, row);
    }
    return this.getData(row, column.name);
  }

  public getData(row:any, propertyName:string):string {
    return propertyName.split('.').reduce((prev:any, curr:string) => prev[curr], row);
  }

  public cellClick(row:any, column:ITableColumn):void {
    if(column.action){
      let data = this.getData(row, column.name);
      column.action(data, row);
    }
  }

  onFullTextFilterValueChange(event: any){
    this.fullTextFilterValueChanged.next(event)
  }
}