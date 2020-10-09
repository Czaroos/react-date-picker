import React from 'react';
import { MonthArrow } from '../../model';
import { PreviousMonthArrowIcon } from '../icons';
import './style.scss';

export const PreviousMonthArrow: React.FC<MonthArrow> = (props) => {
  const { onClick, classNames } = props;

  return (
    <div className={`previousMonthArrow ${classNames}`} onClick={onClick}>
      <PreviousMonthArrowIcon />
    </div>
  );
};
