import React from 'react';
import { Button } from '../../model';

export const YearButton = (props: Button) => {
  const { dateFragment, onClick, className, children } = props;

  return (
    <div className={`clickable ${className}`} onClick={onClick}>
      <h4>{dateFragment}</h4>
      {children}
    </div>
  );
};
