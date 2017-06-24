import { Component, OnInit, OnDestroy, NgModule, TemplateRef, AfterContentInit, ContentChild, EmbeddedViewRef, OnChanges, ViewContainerRef, ViewEncapsulation, Input, Output, EventEmitter, ElementRef, AfterViewInit, Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import {KeysPipe} from './keypipe'
import {styleDirective} from './dataGrid-directive'
import {columnWidth} from './dataGrid-directive'
import {SetContainerHeight} from './dataGrid-directive'


@Component({
  selector: 'c-column',
  template: ``
})

export class Column { 
    @Input() field: string;
    @ContentChild(TemplateRef) template: TemplateRef<any>
    constructor() {   
    }

}

@Component({
  selector: 'c-heading',
  template: ``
})

export class Heading implements AfterContentInit{ 
    
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor() {   
    }
    ngAfterContentInit(){
    }


}

@Component({
  selector: 'c-templateRenderer',
  template: ``
})

export class TemplateRenderer implements OnInit, OnDestroy { 

    @Input() data: any
    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {   
    }
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.data.template, {
            '\$implicit': this.data
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}

}
@Component({
  selector: 'c-columnTemplateRenderer',
  template: ``
})

export class ColumnTemplateRenderer implements OnInit, OnDestroy { 

    @Input() data: any;
    @Input() rowData: any;
    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) {   
    }
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.data.template, {
            '\$implicit': this.data,
            'rowData': this.rowData
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}

}