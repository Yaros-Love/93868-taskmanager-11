import {MONTH_NAMES} from '../const.js';

// custom time format
const custTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = custTimeFormat(date.getHours() % 12);
  const minutes = custTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const humanizeTaskDueDate = (dueDate) => {
  const date = `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}`;
  const time = formatTime(dueDate);

  return `${date} ${time}`;
};

export const isTaskExpired = (dueDate) => dueDate instanceof Date && dueDate < Date.now();

export const isTaskRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

