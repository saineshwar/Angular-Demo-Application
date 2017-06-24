import { NgModule } from '@angular/core';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.component';
import { PositioningService } from '../positioning';
import { ComponentLoaderFactory } from '../component-loader';
export var ModalModule = (function () {
    function ModalModule() {
    }
    ModalModule.forRoot = function () {
        return { ngModule: ModalModule, providers: [ComponentLoaderFactory, PositioningService] };
    };
    ModalModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ModalBackdropComponent, ModalDirective],
                    exports: [ModalBackdropComponent, ModalDirective],
                    entryComponents: [ModalBackdropComponent]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = function () { return []; };
    return ModalModule;
}());
//# sourceMappingURL=modal.module.js.map