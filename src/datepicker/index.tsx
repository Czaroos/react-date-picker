import React, { useState } from 'react';

import * as M from './model';

import { EN } from './languages';

import {
  NextMonthArrow,
  PreviousMonthArrow,
  NextMonthArrowIcon,
  PreviousMonthArrowIcon,
} from './components';

import './style.scss';

const getToday = (): M.Date => {
  const today = new Date();

  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    dayOfWeek: today.getDay(),
  };
};

const parseInitDate = (initDate: M.InitDate): M.Date => {
  const { day, month, year } = initDate;

  return {
    day,
    month,
    year,
    dayOfWeek: new Date(year, month, day).getDay(),
  };
};

// in the future add day & month bounds as well
// add vertical option
export const DatePicker = ({
  language = EN,
  initDate,
  sliceEndIndex = 3,
  vertical = false,
  previousMonthArrow,
  nextMonthArrow,
  showPreviousMonthDays = true,
  showNextMonthDays = true,
  leftYearBound = 1900,
  rightYearBound = 2100,
  previousYearButton,
  nextYearButton,
}: M.Props) => {
  //change it to hook useDate(initDate) later
  const [date, setDate] = useState<M.Date>(getToday());
  const [error, setError] = useState('');

  if (initDate) {
    const { day, month, year } = initDate;

    const isValidDate =
      new Date(year, month, day).getDate() === day &&
      year >= leftYearBound &&
      year <= rightYearBound;

    isValidDate
      ? setDate(parseInitDate(initDate))
      : // set to multilingual message & display error message discreetly (?)
        setError(`Invalid date! Date has been set to today.`);
  }

  const { day, month, dayOfWeek, year } = date;

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

  const getDayOfWeek = (day: number, month: number, year: number) => {
    return new Date(year, month, day).getDay();
  };

  const setDay = (day: number) => {
    setDate({
      ...date,
      day,
      dayOfWeek: getDayOfWeek(day, month, year),
    });
  };

  const setNextMonthDay = (day: number) => {
    const newMonth = nextMonth;
    const newYear = nextMonth === 0 ? nextYear : year;

    setDate({
      day,
      month: newMonth,
      year: newYear,
      dayOfWeek: getDayOfWeek(day, newMonth, newYear),
    });
  };

  const setPreviousMonthDay = (day: number) => {
    const newMonth = previousMonth;
    const newYear = previousMonth === 11 ? previousYear : year;

    setDate({
      day,
      month: newMonth,
      year: newYear,
      dayOfWeek: getDayOfWeek(day, newMonth, newYear),
    });
  };

  const monthToString = (month: number) => {
    return language.MONTHS[month];
  };

  const dayOfWeekToString = (dayOfWeek: number) => {
    return language.DAYS_OF_WEEK[dayOfWeek];
  };

  const isLeapFebruary = (year: number) => {
    return new Date(year, 1, 29).getDate() === 29 && month === 1;
  };

  const DAYS: number[] = isLeapFebruary(year)
    ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const previousMonthDays = Array.from(
    Array(getDayOfWeek(1, month, year)),
    (_, index) => DAYS[previousMonth] - getDayOfWeek(1, month, year) + index + 1
  );

  const currentMonthDays = Array.from(
    Array(DAYS[month]),
    (_, index) => index + 1
  );

  const nextMonthDays = Array.from(
    Array(6 - getDayOfWeek(DAYS[month], month, year)),
    (_, index) => index + 1
  );

  return (
    <div className={`calendarContainer`}>
      <div className={`header`}>
        {previousYearButton ? (
          previousYearButton
        ) : (
          <div
            className={`clickable ${
              previousYear < leftYearBound ? 'disabled' : ''
            }`}
            onClick={setPreviousYear}
          >
            <h4>{previousYear}</h4>
          </div>
        )}

        {/*  set formatting depending on prop passed */}
        <h2>{`${day} ${monthToString(month)}, ${year}`}</h2>
        {nextYearButton ? (
          nextYearButton
        ) : (
          <div
            className={`clickable ${
              nextYear > rightYearBound ? 'disabled' : ''
            }`}
            onClick={setNextYear}
          >
            <h4>{nextYear}</h4>
          </div>
        )}
      </div>
      <div className={`days ${vertical ? 'vertical' : ''}`}>
        {language.DAYS_OF_WEEK.map((dayOfWeek) => (
          <h2 key={dayOfWeek}>{dayOfWeek.slice(0, sliceEndIndex)}</h2>
        ))}

        {previousMonthDays.map((day) =>
          showPreviousMonthDays ? (
            <div
              key={day}
              className={`clickable otherMonthDay`}
              onClick={() => setPreviousMonthDay(day)}
            >
              <h3>{day}</h3>
            </div>
          ) : (
            <div />
          )
        )}

        {currentMonthDays.map((day) => (
          <div
            key={day}
            className={`clickable ${day === date.day ? 'selected' : ''}`}
            onClick={() => setDay(day)}
          >
            <h3>{day}</h3>
          </div>
        ))}

        {nextMonthDays.map((day) =>
          showNextMonthDays ? (
            <div
              key={day}
              className={`clickable otherMonthDay`}
              onClick={() => setNextMonthDay(day)}
            >
              <h3>{day}</h3>
            </div>
          ) : (
            <div />
          )
        )}
      </div>
      <div className={`monthArrows`}>
        {previousMonthArrow ? (
          previousMonthArrow
        ) : (
          <PreviousMonthArrow onClick={setPreviousMonth}>
            <PreviousMonthArrowIcon />
          </PreviousMonthArrow>
        )}
        {nextMonthArrow ? (
          nextMonthArrow
        ) : (
          <NextMonthArrow onClick={setNextMonth}>
            <NextMonthArrowIcon />
          </NextMonthArrow>
        )}
      </div>
    </div>
  );
};
