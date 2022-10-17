import {holidays_CO} from './co';

const countryId = process.env.REACT_APP_COUNTRY!;

const holidaysDictionary: Record<string, string[]> = {
  '1': holidays_CO,
};

const padTo2Digits = (num: number): string => num.toString().padStart(2, '0');

export const isHoliday = (date: Date): boolean => {
  const holidaysList = holidaysDictionary?.[countryId] ?? [];
  const formattedDate = [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('/');

  return holidaysList.includes(formattedDate);
};
