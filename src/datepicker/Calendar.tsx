import React from 'react';

import * as M from './model';

import * as U from './utils';

import { EN } from './languages';

import {
  NextMonthArrow,
  PreviousMonthArrow,
  NextMonthArrowIcon,
  PreviousMonthArrowIcon,
} from './components';

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
    previousMonthArrow,
    nextMonthArrow,
    showPreviousMonthDays = true,
    showNextMonthDays = true,
    previousYearButton,
    nextYearButton,
    leftYearBound,
    rightYearBound,
    error,
  } = props;

  const { day, month, year } = date;

  return !error ? (
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
        <h2>{`${day} ${U.monthToString(language, month)}, ${year}`}</h2>
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
  ) : (
    <div>{/* HANDLE ERROR HERE */}</div>
  );
};
