import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker, Calendar, Date } from '../src';
import { getToday } from '../src/datepicker/utils';
import './style.scss';

storiesOf('Date Picker', module).add('box view', function () {
  const [date, setDate] = useState<Date>(getToday());

  return (
    <div className={`centeredContainer`}>
      <DatePicker date={date} setDate={setDate}>
        <Calendar />
      </DatePicker>
    </div>
  );
});
