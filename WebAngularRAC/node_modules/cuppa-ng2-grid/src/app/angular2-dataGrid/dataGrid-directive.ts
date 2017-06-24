import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[styleProp]'
})
export class styleDirective {

  constructor(private el: ElementRef) {

   }

  @Input('styleProp') styleVal: number;

   ngOnInit() {

      this.el.nativeElement.style.top = this.styleVal;
   }
    ngOnChanges(): void {
       this.el.nativeElement.style.top = this.styleVal;
  }
}

@Directive({
  selector: '[columnWidth]'
})
export class columnWidth {

  constructor(private el: ElementRef) {

   }

  @Input('columnWidth') columns:any[];

   ngOnInit() {
      this.el.nativeElement.style.width = (100/this.columns.length)+"%";
   }
}

@Directive({
  selector: '[setContainerHeight]'
})
export class SetContainerHeight {

  constructor(private el: ElementRef) {

   }

  @Input('setContainerHeight') containerHeight:any[];

   ngOnInit() {
      this.el.nativeElement.style.height = this.containerHeight+"px";
   }
   ngOnChanges(): void {
       this.el.nativeElement.style.height = this.containerHeight+"px";
   }
}