import { Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { TabsetComponent } from './tabset.component';
export var TabDirective = (function () {
    function TabDirective(tabset) {
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new EventEmitter();
        /** fired before tab will be removed */
        this.removed = new EventEmitter();
        this.addClass = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        /** tab active state toggle */
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this._active = active;
                }
                this.deselect.emit(this);
                return;
            }
            this._active = active;
            this.select.emit(this);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnInit = function () {
        this.removable = this.removable;
    };
    TabDirective.decorators = [
        { type: Directive, args: [{ selector: 'tab, [tab]' },] },
    ];
    /** @nocollapse */
    TabDirective.ctorParameters = function () { return [
        { type: TabsetComponent, },
    ]; };
    TabDirective.propDecorators = {
        'heading': [{ type: Input },],
        'disabled': [{ type: Input },],
        'removable': [{ type: Input },],
        'customClass': [{ type: Input },],
        'active': [{ type: HostBinding, args: ['class.active',] }, { type: Input },],
        'select': [{ type: Output },],
        'deselect': [{ type: Output },],
        'removed': [{ type: Output },],
        'addClass': [{ type: HostBinding, args: ['class.tab-pane',] },],
    };
    return TabDirective;
}());
//# sourceMappingURL=tab.directive.js.map