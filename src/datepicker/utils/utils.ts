import * as M from '../model';

export const dayOfWeekToString = (language: M.Language, dayOfWeek: number) => {
  return language.DAYS_OF_WEEK[dayOfWeek];
};

export const monthToString = (language: M.Language, month: number) => {
  return language.MONTHS[month];
};

export const getToday = (): M.Date => {
  const today = new Date();

  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    dayOfWeek: today.getDay(),
  };
};

export const parseInitDate = (initDate: M.InitDate): M.Date => {
  const { day, month, year } = initDate;

  return {
    year,
    month: month ? month : 0,
    day: day ? day : 1,
    dayOfWeek: new Date(year, month, day).getDay(),
  };
};

export const isLeapYear = (year: number) => {
  return new Date(year, 1, 29).getDate() === 29;
};

export const getDayOfWeek = (day: number, month: number, year: number) => {
  return new Date(year, month, day).getDay();
};

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
  //RIGHT BOUND CHECKS
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
    return `Right bound year ${rightBound.year} must be greater than left bound year ${leftBound.year}!`;

  const areValidMonths = rightBound.month >= leftBound.month;
  if (!areValidMonths)
    return `Right bound month ${rightBound.month} must be greater than left bound month ${leftBound.month}!`;

  const areValidDays = rightBound.day >= leftBound.day;
  if (!areValidDays)
    return `Right bound day ${rightBound.day} must be greater than left bound day ${leftBound.day}!`;

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
};

export const useLeftBound = (leftBound: M.InitDate): M.InitDate => {
  const { day, month, year } = leftBound;

  return {
    year,
    month: month ? month : 0,
    day: day ? day : 1,
  };
};

export const useRightBound = (rightBound: M.InitDate): M.InitDate => {
  const { day, month, year } = rightBound;

  return {
    year,
    month: month ? month : 11,
    day: day ? day : 31,
  };
};
