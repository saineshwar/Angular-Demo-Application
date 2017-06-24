export declare class ProgressBarComponent {
    state: any;
    positionUsing: any;
    ease: any;
    speed: any;
    showSpinner: any;
    direction: any;
    thick: any;
    color: any;
    /** Styles for progressbar */
    barStyles(): {
        transition: string;
        backgroundColor: any;
    };
    /** Styles for progressbar tail */
    shadowStyles(): {
        boxShadow: string;
    };
    toPercentage(n: any): number;
    spinnerClasses(): any;
}
