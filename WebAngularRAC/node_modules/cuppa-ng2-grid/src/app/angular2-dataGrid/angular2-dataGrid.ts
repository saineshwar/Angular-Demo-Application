import { Component, OnInit, NgModule, OnChanges, ContentChild, ContentChildren,QueryList, ViewEncapsulation, AfterContentInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import {KeysPipe} from './keypipe'
import {styleDirective} from './dataGrid-directive'
import {columnWidth} from './dataGrid-directive'
import {SetContainerHeight} from './dataGrid-directive'
import {Column, Heading, TemplateRenderer, ColumnTemplateRenderer} from './column';

@Component({
  selector: 'cuppa-datagrid',
  templateUrl: 'angular2-dataGrid.template.html',
  styleUrls: ['angular2-dataGrid.styles.css','icons.css']
})

export class CuppaDataGrid implements AfterViewInit, AfterContentInit{ 
    
    @Input() datalist: Column[];
    @Input() config: any;
    @Output('onRowSelect') 
        rowClick: EventEmitter<any> = new EventEmitter<any>();
    @ContentChild(Heading) heading: Heading;
    @ContentChildren(Column) columns: QueryList<Column>;

    private width:any;
    private height:any;
    private itemHeight:any;
    private items:any;
    private totalRows:any;
    private screenItemsLen:any;
    private cachedItemsLen:any;
    private lastRepaintY: any;
    private maxBuffer:any;
    private lastScrolled:any;
    private contianer:any
    private rmNodeInterval:any;
    private totalHeight: any;
    private scroller:any;
    private dataArray:any[] = ["111","222","333","444"];
    private chunkArray:any[];
    private scrollTop:any;
    private chunkIndex:any[] = [];
    private headSection:any[];
    private cachedItems:any[] = [];

    constructor(private _elementRef : ElementRef, private sanitizer: DomSanitizer) {   
    }

    ngOnInit() {
        this.width = (this.config && this.config.w + 'px') || '100%';
        this.height = (this.config && this.config.h + 'px') || '100%';
        this.itemHeight = this.config.itemHeight;
        this.items = this.config.items;
        this.totalRows = this.config.totalRows || (this.config.items && this.config.items.length);
        this.screenItemsLen = Math.ceil(this.config.h / this.itemHeight);
        this.cachedItemsLen = this.screenItemsLen * 3;
        this.totalHeight = this.itemHeight * this.totalRows;
        this.scroller = this.createScroller(this.totalHeight);
        this.maxBuffer = this.screenItemsLen * this.itemHeight;
        this.lastScrolled = 0;
        this.generateHeadArray(this.items[0]);
        this._renderChunk(0, this.cachedItemsLen / 2);
    }
    ngAfterViewInit() {
        this._elementRef.nativeElement.getElementsByClassName("container")[0].addEventListener('scroll', this.onScroll.bind(this));
    }
    ngAfterContentInit(){
    }
    private generateHeadArray(row:any[]){
        
        this.headSection = [];
        var ind= 0;
        for(var prop in row){
            var tempObj = {"title":prop,"sorting":"",'prop':prop,'index':ind};
            if(this.config.sort){
                
                for(var sortprop in this.config.sort){
                    if(this.config.sort.hasOwnProperty(prop)){
                        tempObj.sorting = this.config.sort[prop];
                        this.sortColumn(tempObj);
                    }
                }
            }
            this.headSection.push(tempObj);
            ind++;
        }
    }
    private changeData(){
        var temArr = ["1","2","3","4"];
         this.dataArray = temArr;
    }
    private getHeightVal(i:any){
        var c:any = i*31;
        c = c+"px";
        return c;
    }
    private onScroll(e:any) {
        this.scrollTop = e.target.scrollTop;
        this.updateView(this.scrollTop);

    }
    private updateView(scrollTop:any){
        var scrollPos = scrollTop ? scrollTop: 0;
         var first = (scrollPos / this.itemHeight) - this.screenItemsLen;
        var firstTemp = ""+first;
        first = parseInt(firstTemp) < 0 ? 0 : parseInt(firstTemp);
            this._renderChunk(first, this.cachedItemsLen);
            this.lastRepaintY = scrollPos;      
    }
    
    /*
        Create Row DOM, iterating through the data array
    */
    private _renderChunk(fromPos:any, howMany:any) {
        this.chunkArray = [];
        this.chunkIndex = [];
        var finalItem = fromPos + howMany;
        if (finalItem > this.totalRows)
            finalItem = this.totalRows;

        for (var i = fromPos; i < finalItem; i++) {
                this.chunkIndex.push((i * this.itemHeight) + 'px');
                this.chunkArray.push(this.items[i]);
        }
    }

    private createScroller(h:any){
        var scroller = document.createElement('div');
        scroller.style.opacity = "0";
        scroller.style.position = 'absolute';
        scroller.style.top = "0";
        scroller.style.left = "0";
        scroller.style.width = '1px';
        scroller.style.height = h + 'px';
        return scroller;
    }
    private sortColumn(column:any){
        if(this.config.sort){
            for(var t=0;t<this.headSection.length;t++){
                if(t != column.index){
                    this.headSection[t].sorting = "";
                }     
            }
            if(column.sorting == ""){
                column.sorting = "asc"
            }
            this.items = this.mergeSort(this.items,column.prop,column.sorting);
            this.updateView(this.scrollTop);
            if(column.sorting == "asc"){
                column.sorting = "desc"
            }
            else if(column.sorting == "desc"){
                column.sorting = "asc";
            }
        }
    }

    private mergeSort(arr:any[],column:any,sortType:any){
        var len = arr.length;
        if(len <2)
            return arr;
        var mid:any = Math.floor(len/2),
            left:any = arr.slice(0,mid),
            right:any =arr.slice(mid);
        var temp:any = this.merge(this.mergeSort(left,column,sortType),this.mergeSort(right,column,sortType),column,sortType);
        return temp;
    }
    private merge(left:any, right:any,column:any,sortType:any){
        var result:any[] = [],
            lLen = left.length,
            rLen = right.length,
            l = 0,
            r = 0;
        while(l < lLen && r < rLen){
            if(this.compare(left[l],right[r],column,sortType) <=0){
            result.push(left[l++]);
            }
            else{
            result.push(right[r++]);
            }
        }  
        //remaining part needs to be addred to the result
        return result.concat(left.slice(l)).concat(right.slice(r));
    }
    private compare(item1:any,item2:any,column:any, sortType :any){

        if(typeof item1[column] == 'string'){
            if ( item1[column].toLowerCase() < item2[column].toLowerCase() && sortType == 'asc' )
                return -1;
            if ( item1[column].toLowerCase()  > item2[column].toLowerCase() && sortType == 'asc' )
                return 1;
            if ( item1[column].toLowerCase() > item2[column].toLowerCase() && sortType == 'desc')
                return -1;
            if ( item1[column].toLowerCase()  < item2[column].toLowerCase() && sortType == 'desc')
                return 1;
            else
                return 0;
        }
        else if(typeof item1[column] == 'number'){
            if ( item1[column]< item2[column] && sortType == 'asc')
            return -1;
            if ( item1[column]> item2[column] && sortType == 'asc')
            return 1;
            if ( item1[column]> item2[column] && sortType == 'desc')
            return -1;
            if ( item1[column] < item2[column] && sortType == 'desc')
            return 1;
            else
            return 0;
        }
        
    }
    private  search(evt:any){
        var filteredElems:Array<any> = [];
        if(evt.target.value.toString() != ''){
          this.items.filter(function(el:any){
              for(var prop in el){
                  if(el[prop].toString().toLowerCase().indexOf(evt.target.value.toString().toLowerCase()) >=0 ){
                      filteredElems.push(el);
                  }
              }
          });
            this.cachedItems = this.items;
            this.totalHeight = this.itemHeight * filteredElems.length;
            this.totalRows = filteredElems.length;
            this.items = [];
            this.items = filteredElems;
            this.updateView(this.scrollTop);
        }
        else if(evt.target.value.toString() == '' && this.cachedItems.length > 0){
            this.items = [];
            this.items = this.cachedItems;
            this.totalHeight = this.itemHeight * this.items.length;
            this.totalRows = this.items.length;
            this.updateView(this.scrollTop);
        } 
    }
    private filter(evt:any){
        if(evt.target.value.toString() == '' && this.cachedItems.length > 0){
            this.items = [];
            this.items = this.cachedItems;
            this.cachedItems = [];
            this.totalHeight = this.itemHeight * this.items.length;
            this.totalRows = this.items.length;
            this.updateView(this.scrollTop);
        }
    }
    private onRowClick(row:any){
        this.rowClick.emit(row);
    }
    private getColumnData(row, field){
        return row[field];
    }

 }
@NgModule({
  imports:      [ CommonModule ],
  declarations: [CuppaDataGrid,KeysPipe, styleDirective,columnWidth,SetContainerHeight, Column, Heading, TemplateRenderer, ColumnTemplateRenderer],
  exports:      [CuppaDataGrid,KeysPipe, styleDirective,columnWidth,SetContainerHeight, Column, Heading, TemplateRenderer, ColumnTemplateRenderer]
})
export class CuppaDataGridModule { }