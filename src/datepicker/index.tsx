import React, { useState } from 'react';

import * as M from './model';

import { EN } from './languages';

import { NextMonthArrow, PreviousMonthArrow } from './components';

import './style.scss';

// clean this up
const getToday = (months: string[], daysOfWeek: string[]): M.Date => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    dayOfWeek: today.getDay(),
  };
};

export const DatePicker = ({
  language = EN,
  initDate,
  sliceEndIndex = 3,
  placement = 'horizontal',
  previousMonthArrow,
  nextMonthArrow,
  showPreviousMonthDays = true,
  showNextMonthDays = true,
}: M.Props) => {
  //change it to hook useDate(initDate) later
  const [date, setDate] = useState<M.Date>(
    initDate ? initDate : getToday(language.MONTHS, language.DAYS_OF_WEEK)
  );

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

  const setDay = (
    day: number,
    otherMonth: number = month,
    otherYear: number = year
  ) => {
    setDate({
      day,
      month: otherMonth,
      year: otherYear,
      dayOfWeek: getDayOfWeek(day, month, year),
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

  return (
    <div className={`calendarContainer`}>
      <div className={`header`}>
        {/*  later change to previousYearButton prop */}
        <div className={`clickable`} onClick={setPreviousYear}>
          <h4>{previousYear}</h4>
        </div>
        <h2>{`${day} ${monthToString(month)}, ${year}`}</h2>
        {/*  later change to nextYearButton prop */}
        <div className={`clickable`} onClick={setNextYear}>
          <h4>{nextYear}</h4>
        </div>
      </div>
      <div className={`days`}>
        {language.DAYS_OF_WEEK.map((dayOfWeek) => (
          <h2 key={dayOfWeek}>{dayOfWeek.slice(0, sliceEndIndex)}</h2>
        ))}

        {Array.from(
          Array(getDayOfWeek(1, month, year)),
          (_, index) =>
            M.DAYS[previousMonth] - getDayOfWeek(1, month, year) + index + 1
        ).map((previousMonthDay) =>
          showPreviousMonthDays ? (
            <div
              key={previousMonthDay}
              className={`clickable otherMonthDay`}
              onClick={() =>
                setDay(previousMonthDay, previousMonth, previousYear)
              }
            >
              <h3>{previousMonthDay}</h3>
            </div>
          ) : (
            <div />
          )
        )}

        {Array.from(Array(M.DAYS[month]), (_, index) => index + 1).map(
          (day) => (
            <div
              key={day}
              className={`clickable ${day === date.day ? 'selected' : ''}`}
              onClick={() => setDay(day)}
            >
              <h3>{day}</h3>
            </div>
          )
        )}

        {isLeapFebruary(year) && (
          <div className={`clickable`} onClick={() => setDay(29)}>
            <h3>29</h3>
          </div>
        )}

        {Array.from(
          Array(6 - getDayOfWeek(M.DAYS[month], month, year)),
          (_, index) => index + 1
        ).map((nextMonthDay) =>
          showNextMonthDays ? (
            <div
              key={nextMonthDay}
              className={`clickable otherMonthDay`}
              onClick={() => setDay(nextMonthDay, nextMonth, nextYear)}
            >
              <h3>{nextMonthDay}</h3>
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
          <PreviousMonthArrow onClick={setPreviousMonth} />
        )}
        {nextMonthArrow ? (
          nextMonthArrow
        ) : (
          <NextMonthArrow onClick={setNextMonth} />
        )}
      </div>
    </div>
  );
};
