import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from '../src';
import './style.scss';

storiesOf('Date Picker', module).add('box view', function () {
  return (
    <div className={`centeredContainer`}>
      <DatePicker />
    </div>
  );
});
