import {Observable} from 'rxjs/Observable';

export type SORT_ORDER = 'asc' | 'desc';
export type FILTER_TYPE = 'default' | 'text' | 'range' | 'daterange' | 'equals' | 'collection';
export type FILTER_CONTROL_TYPE = 'default' | 'list';

export interface ITableOptions {
    language?: string | any;
    orderMulti?: boolean;
    className?: string;
}

export interface ITablePaging {
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    maxSize:number;
}

export interface ITableDataSource {
    (request: IDatasourceParameters): Observable<IDatasourceResult>;
}

export interface ITableColumn {
    name : string;
    title? : string;
    width? : number;
    sort?: boolean;
    defaultSortOrder?: SORT_ORDER;
    filter?: ITableColumnFilter;
    render?: ITableColumnRender;
    action?: ITableColumnAction;
}

export interface ITableColumnFilter {
    type: FILTER_TYPE;
    controlType: FILTER_CONTROL_TYPE;
    config?: ITableColumnFilterDefault | ITableColumnFilterList;
}

export interface ITableColumnFilterDefault {
    placeholder?: string;
    type?:string;
    max?: number | Date;
    min?: number | Date;
    step?: number;
}

export interface ITableColumnFilterList {
    nullText?:string;
    list: any[];
}

export interface ITableColumnRender {
    (value: any, row: Object): string;
}

export interface ITableColumnAction {
    (value: any, row: Object): void;
}

export interface IDatasourceParameters { 
    start: number; 
    length: number; 
    orders: IDatasourceOrder[];
    filters: IDatasourceFilter[]; 
    fullTextFilter: string;
}

export interface IDatasourceFilter { 
    name: string; 
    type: FILTER_TYPE;
    value: any;
}

export interface IDatasourceOrder { 
    name: string; 
    dir: SORT_ORDER;
}

export interface IDatasourceResult { 
    recordsTotal: number; 
    recordsFiltered: number; 
    data: any[];
}

export interface PagingState {
    currentPage:number;
    itemsPerPage: number;
    recordsTotal: number; 
    recordsFiltered: number; 
}

export interface ColumnState {
    filterValue : any;
    sortOrder : SORT_ORDER;
    def : ITableColumn;
    hasSort : boolean;
    hasFilter : boolean;
}