import { IMyDate } from "../interfaces/my-date.interface";
import { IMyDateRange } from "../interfaces/my-date-range.interface";
import { IMyMonth } from "../interfaces/my-month.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";
import { IMyMarkedDates } from "../interfaces/my-marked-dates.interface";
import { IMyMarkedDate } from "../interfaces/my-marked-date.interface";
export declare class UtilService {
    isDateValid(dateStr: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRanges: Array<IMyDateRange>, monthLabels: IMyMonthLabels, enableDays: Array<IMyDate>): IMyDate;
    getDateFormatSeparators(dateFormat: string): Array<string>;
    changeDateFormat(dateFormat: string, len: number): string;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number;
    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number;
    getDatePartIndex(dateFormat: string, datePart: string): number;
    parseDefaultMonth(monthString: string): IMyMonth;
    isDisabledDay(date: IMyDate, disableUntil: IMyDate, disableSince: IMyDate, disableWeekends: boolean, disableDays: Array<IMyDate>, disableDateRanges: Array<IMyDateRange>, enableDays: Array<IMyDate>): boolean;
    isMarkedDate(date: IMyDate, markedDates: Array<IMyMarkedDates>, markWeekends: IMyMarkedDate): IMyMarkedDate;
    isHighlightedDate(date: IMyDate, sunHighlight: boolean, satHighlight: boolean, highlightDates: Array<IMyDate>): boolean;
    getWeekNumber(date: IMyDate): number;
    isMonthDisabledByDisableUntil(date: IMyDate, disableUntil: IMyDate): boolean;
    isMonthDisabledByDisableSince(date: IMyDate, disableSince: IMyDate): boolean;
    isInitializedDate(date: IMyDate): boolean;
    isSameDate(d1: IMyDate, d2: IMyDate): boolean;
    getTimeInMilliseconds(date: IMyDate): number;
    getDayNumber(date: IMyDate): number;
}
