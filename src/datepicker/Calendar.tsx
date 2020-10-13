import React, { cloneElement } from 'react';

import * as M from './model';

import * as U from './utils';

import { EN } from './languages';

import { NextMonthArrow, PreviousMonthArrow, YearButton } from './components';

import './style.scss';

// in the future add day & month bounds as well
export const Calendar = (props: M.CalendarProps) => {
  const {
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
    language = EN,
    sliceEndIndex = 3,
    previousMonthArrow = <PreviousMonthArrow />,
    nextMonthArrow = <NextMonthArrow />,
    showPreviousMonthDays = true,
    showNextMonthDays = true,
    previousYearButton = <YearButton />,
    nextYearButton = <YearButton />,
    leftBound,
    rightBound,
  } = props;

  const { day, month, year } = date;

  return (
    <div className={`calendarContainer`}>
      <div className={`header`}>
        {cloneElement(previousYearButton, {
          onClick: setPreviousYear,
          dateFragment: previousYear,
        })}
        {/*  set formatting depending on prop passed */}
        <h2>{`${day} ${U.monthToString(language, month)}, ${year}`}</h2>
        {cloneElement(nextYearButton, {
          onClick: setNextYear,
          dateFragment: nextYear,
        })}
      </div>
      <div className={`days`}>
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
        {cloneElement(previousMonthArrow, {
          onClick: setPreviousMonth,
          dateFragment: previousMonth,
        })}
        {cloneElement(nextMonthArrow, {
          onClick: setNextMonth,
          dateFragment: nextMonth,
        })}
      </div>
    </div>
  );
};
