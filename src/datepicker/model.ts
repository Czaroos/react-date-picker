export const DAYS: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export type Date = {
    day: number,
    month: number,
    year: number
    dayOfWeek: number,
}

export interface Button {
    onClick(): void;
    className?: string;
}

export type Language = {
    MONTHS: string[],
    DAYS_OF_WEEK: string[]
}

export type Days =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
export type Months = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type InitDate = {
    day: Days
    month: Months
    year: number
}

export type SliceEndIndex = 1 | 2 | 3


export interface Props {
    language?: Language;
    initDate?: InitDate;
    sliceEndIndex?: SliceEndIndex;
    vertical?: boolean;
    previousMonthArrow?: React.FC<Button>
    nextMonthArrow?: React.FC<Button>
    showPreviousMonthDays?: boolean;
    showNextMonthDays?: boolean;
    leftYearBound?: number;
    rightYearBound?: number;
    previousYearButton?: React.FC<Button>
    nextYearButton?: React.FC<Button>;
}