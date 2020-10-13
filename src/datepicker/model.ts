import { ReactElement } from 'react';

export type Date = {
  day: number;
  month: number;
  year: number;
  dayOfWeek: number;
};

export interface DatePickerProps {
  date: Date;
  setDate(date: Date): void;
  leftYearBound?: number;
  rightYearBound?: number;
  children: ReactElement<CalendarProps>;
}

export interface DatePickerLogic {
  date: Date;
  previousYear: number;
  nextYear: number;
  nextMonth: number;
  previousMonth: number;
  setNextYear(): void;
  setPreviousYear(): void;
  setNextMonth(): void;
  setPreviousMonth(): void;
  setDay(day: number): void;
  setNextMonthDay(day: number): void;
  setPreviousMonthDay(day: number): void;
  previousMonthDays: number[];
  currentMonthDays: number[];
  nextMonthDays: number[];
}

export interface Button {
  onClick?(): void;
  children?: ReactElement;
  className?: string;
}

export type Language = {
  MONTHS: string[];
  DAYS_OF_WEEK: string[];
};

export type SliceEndIndex = 1 | 2 | 3;

export interface CalendarProps extends Partial<DatePickerLogic> {
  language?: Language;
  sliceEndIndex?: SliceEndIndex;
  previousMonthArrow?: ReactElement<Button>;
  nextMonthArrow?: ReactElement<Button>;
  showPreviousMonthDays?: boolean;
  showNextMonthDays?: boolean;
  previousYearButton?: ReactElement<Button>;
  nextYearButton?: ReactElement<Button>;
  leftYearBound?: number;
  rightYearBound?: number;
  error?: string;
}

export type Days =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type Months = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type InitDate = {
  day: Days;
  month: Months;
  year: number;
};
