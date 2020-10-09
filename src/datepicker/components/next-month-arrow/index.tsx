import React from 'react';
import { MonthArrow } from '../../model';
import { NextMonthArrowIcon } from '../icons';
import './style.scss';

export const NextMonthArrow: React.FC<MonthArrow> = (props) => {
  const { onClick, classNames } = props;

  return (
    <div className={`nextMonthArrow ${classNames}`} onClick={onClick}>
      <NextMonthArrowIcon />
    </div>
  );
};
