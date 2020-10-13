import React from 'react';
import { Button } from '../../model';
import { PreviousMonthArrowIcon } from './icon/PreviousMonthArrowIcon';
import './style.scss';

export const PreviousMonthArrow = (props: Button) => {
  const { onClick, className, children } = props;

  return (
    <div className={`previousMonthArrow ${className}`} onClick={onClick}>
      <PreviousMonthArrowIcon />
      {children}
    </div>
  );
};
