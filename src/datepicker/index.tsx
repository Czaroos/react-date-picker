import React, { useState } from 'react';
import * as M from './model';
import { EN } from './languages';
import './style.scss';

const getToday = (months: string[], daysOfWeek: string[]): M.Date => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: months[today.getMonth()],
    dayOfWeek: daysOfWeek[today.getDay() - 1],
    year: today.getFullYear(),
  };
};

export const DatePicker = ({ language = EN, initDate }: M.Props) => {
  const [date, setDate] = useState<M.Date>(
    initDate ? initDate : getToday(language.MONTHS, language.DAYS_OF_WEEK)
  );

  const previousYear = date.year - 1;
  const nextYear = date.year + 1;

  return (
    <div className={`calendarContainer`}>
      <div className={`header`}>
        <h4>{previousYear}</h4>
        <h2>{`${date.month}, ${date.year}`}</h2>
        <h4>{nextYear}</h4>
      </div>
    </div>
  );
};
