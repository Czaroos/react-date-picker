import React from 'react';
import { Button } from '../../model';
import './style.scss';

export const NextMonthArrow: React.FC<Button> = (props) => {
  const { onClick, className, children } = props;

  return (
    <div className={`nextMonthArrow ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
