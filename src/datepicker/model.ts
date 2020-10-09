import * as L from './languages';

export type DaysNumber = 28 | 29 | 30 | 31;
export type Date = {
    day: number,
    month: string,
    dayOfWeek: string,
    year: number
}

export type Language = typeof L.EN | typeof L.PL;

export interface Props {
    language?: Language;
    initDate?: Date;
}