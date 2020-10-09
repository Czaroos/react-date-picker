import * as L from './languages';

export const DAYS: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export type Date = {
    day: number,
    month: number,
    dayOfWeek: number,
    year: number
}

export interface MonthArrow {
    onClick(): void;
    classNames?: string;
}

export type Language = typeof L.EN | typeof L.PL;
export type SliceEndIndex = 1 | 2 | 3
export type Placement = 'horizontal' | 'vertical'

export interface Props {
    language?: Language;
    initDate?: Date;
    sliceEndIndex?: SliceEndIndex;
    placement?: Placement;
    previousMonthArrow?: React.FC<MonthArrow>
    nextMonthArrow?: React.FC<MonthArrow>
}