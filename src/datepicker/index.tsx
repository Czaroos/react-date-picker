import React, { useState } from 'react';

import * as M from './model';

import { EN } from './languages';

import { NextMonthArrow, PreviousMonthArrow } from './components';

import './style.scss';

const getToday = (months: string[], daysOfWeek: string[]): M.Date => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(),
    dayOfWeek: today.getDay() - 1,
    year: today.getFullYear(),
  };
};

export const DatePicker = ({
  language = EN,
  initDate,
  sliceEndIndex = 3,
  placement = 'horizontal',
  previousMonthArrow,
  nextMonthArrow,
}: M.Props) => {
  //change it to hook useDate(initDate) later
  const [date, setDate] = useState<M.Date>(
    initDate ? initDate : getToday(language.MONTHS, language.DAYS_OF_WEEK)
  );

  const { day, month, dayOfWeek, year } = date;

  const previousYear = year - 1;
  const nextYear = year + 1;
  const nextMonth = month + 1;
  const previousMonth = month - 1;

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

  // set dayOfWeek as well
  const setDay = (day: number) => {
    setDate({ ...date, day });
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
        {Array.from(Array(M.DAYS[month]), (_, index) => index + 1).map(
          (day) => (
            <div className={`clickable`} onClick={() => setDay(day)}>
              <h3 key={day}>{day}</h3>
            </div>
          )
        )}
        {isLeapFebruary(year) && (
          <div className={`clickable`} onClick={() => setDay(29)}>
            <h3 key={29}>29</h3>
          </div>
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
