import { ElementRef, Renderer, AfterViewInit } from "@angular/core";
export declare class FocusDirective implements AfterViewInit {
    private el;
    private renderer;
    value: string;
    constructor(el: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
}
