import React from 'react';
import { Button } from '../../model';
import './style.scss';

export const PreviousMonthArrow = (props: Button) => {
  const { onClick, className, children } = props;

  return (
    <div className={`previousMonthArrow ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
