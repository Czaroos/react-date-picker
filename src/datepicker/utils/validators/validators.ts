import * as M from '../..';

export const validateDate = (
  date: M.Date,
  leftBound: M.InitDate,
  rightBound: M.InitDate
) => {
  const { day, month, year, dayOfWeek } = date;
  const dateObj = new Date(year, month, day);

  const isValidDay = dateObj.getDate() === day;
  if (!isValidDay)
    return `Invalid day! Day ${day} doesn't exist on month ${month}, ${year}.`;

  const isValidDayOfWeek = dateObj.getDay() === dayOfWeek;
  if (!isValidDayOfWeek)
    return `Invalid day of week! Day ${day} of ${month}, ${year} is not a passed day of week.`;

  //LEFT BOUND CHECKS
  const leftYearCheck = year >= leftBound.year;
  if (!leftYearCheck)
    return `Year ${year} must be equal/greater than left bound year ${leftBound.year}`;

  const leftMonthCheck = month >= leftBound.month;
  if (!leftMonthCheck)
    return `Month ${month} must be equal/greater than left bound month ${leftBound.month}`;

  const leftDayCheck = day >= leftBound.day;
  if (!leftDayCheck)
    return `Day ${day} must be equal/greater than left bound day ${leftBound.day}`;

  //RIGHT BOUND CHECKS
  const rightYearCheck = year <= rightBound.year;
  if (!rightYearCheck)
    return `Year ${year} must be equal/lesser than right bound year ${rightBound.year}`;

  const rightMonthCheck = month <= rightBound.month;
  if (!rightMonthCheck)
    return `Month ${month} must be equal/lesser than right bound month ${rightBound.month}`;

  const rightDayCheck = day <= rightBound.day;
  if (!rightDayCheck)
    return `Day ${day} must be equal/lesser than right bound day ${rightBound.day}`;

  return null;
};

export const validateBounds = (
  leftBound: M.InitDate,
  rightBound: M.InitDate
) => {
  const isLeftYearValid = leftBound.year >= 0;
  if (!isLeftYearValid)
    `We don't support before Christ era at this moment :). Please provide us with a year greater than 0.`;

  const areValidYears = rightBound.year >= leftBound.year;
  if (!areValidYears)
    return `Right bound year ${rightBound.year} must be equal/greater than left bound year ${leftBound.year}!`;

  const areValidMonths = rightBound.month >= leftBound.month;
  if (!areValidMonths)
    return `Right bound month ${rightBound.month} must be equal/greater than left bound month ${leftBound.month}!`;

  const areValidDays = rightBound.day >= leftBound.day;
  if (!areValidDays)
    return `Right bound day ${rightBound.day} must be equal/greater than left bound day ${leftBound.day}!`;

  const isLeftDayValid =
    new Date(leftBound.year, leftBound.month, leftBound.day).getDate() ===
    leftBound.day;
  if (!isLeftDayValid)
    return `Invalid left bound day! Day ${leftBound.day} doesn't exist on month ${leftBound.month}, ${leftBound.year}.`;

  const isRightDayValid =
    new Date(rightBound.year, rightBound.month, rightBound.day).getDate() ===
    rightBound.day;
  if (!isRightDayValid)
    return `Invalid right bound day! Day ${rightBound.day} doesn't exist on month ${rightBound.month}, ${rightBound.year}.`;

  return null;
};
