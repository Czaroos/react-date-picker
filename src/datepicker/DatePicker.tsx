import React, { useEffect, useState } from 'react';

import * as M from './model';

import * as U from './utils';

export const DatePicker = ({
  date,
  setDate,
  leftYearBound = 1900,
  rightYearBound = 2100,
  children,
}: M.DatePickerProps) => {
  const [error, setError] = useState('');

  useEffect(() => {
    U.validateDate(date, leftYearBound, rightYearBound, setError);
  }, [date]);

  const { month, year } = date;

  const previousYear = year - 1;
  const nextYear = year + 1;
  const nextMonth = month !== 11 ? month + 1 : 0;
  const previousMonth = month !== 0 ? month - 1 : 11;

  const setNextYear = () => {
    setDate({ ...date, year: nextYear });
  };

  const setPreviousYear = () => {
    setDate({ ...date, year: previousYear });
  };

  const setNextMonth = () => {
    if (month === 11) setDate({ ...date, month: 0, year: nextYear });
    else setDate({ ...date, month: nextMonth });
  };

  const setPreviousMonth = () => {
    if (month === 0) setDate({ ...date, month: 11, year: previousYear });
    else setDate({ ...date, month: previousMonth });
  };

  const setDay = (day: number) => {
    setDate({
      ...date,
      day,
      dayOfWeek: U.getDayOfWeek(day, month, year),
    });
  };

  const setNextMonthDay = (day: number) => {
    const newMonth = nextMonth;
    const newYear = nextMonth === 0 ? nextYear : year;

    setDate({
      day,
      month: newMonth,
      year: newYear,
      dayOfWeek: U.getDayOfWeek(day, newMonth, newYear),
    });
  };

  const setPreviousMonthDay = (day: number) => {
    const newMonth = previousMonth;
    const newYear = previousMonth === 11 ? previousYear : year;

    setDate({
      day,
      month: newMonth,
      year: newYear,
      dayOfWeek: U.getDayOfWeek(day, newMonth, newYear),
    });
  };

  const DAYS = U.isLeapYear(year)
    ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const previousMonthDays = Array.from(
    Array(U.getDayOfWeek(1, month, year)),
    (_, index) =>
      DAYS[previousMonth] - U.getDayOfWeek(1, month, year) + index + 1
  );

  const currentMonthDays = Array.from(
    Array(DAYS[month]),
    (_, index) => index + 1
  );

  const nextMonthDays = Array.from(
    Array(6 - U.getDayOfWeek(DAYS[month], month, year)),
    (_, index) => index + 1
  );

  return (
    <div>
      {React.cloneElement(children, {
        date,
        previousYear,
        nextYear,
        nextMonth,
        previousMonth,
        setNextYear,
        setPreviousYear,
        setNextMonth,
        setPreviousMonth,
        setDay,
        setNextMonthDay,
        setPreviousMonthDay,
        previousMonthDays,
        currentMonthDays,
        nextMonthDays,
        leftYearBound,
        rightYearBound,
        error,
      })}
    </div>
  );
};
