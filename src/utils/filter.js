import {isOverDueDate, isRepeating, isOneDay} from "./common";
import {FilterType} from "../consts";

const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

const getOverDueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverDueDate(dueDate, date);
  });
};

const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.ALL:
      return getNotArchiveTasks(tasks);
    case FilterType.ARCHIVE:
      return getArchiveTasks(tasks);
    case FilterType.FAVORITES:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case FilterType.OVERDUE:
      return getOverDueTasks(getNotArchiveTasks(tasks), nowDate);
    case FilterType.REPEATING:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case FilterType.TODAY:
      return getTasksInOneDay(getNotArchiveTasks(tasks), nowDate);
  }

  return tasks;
};


export {getArchiveTasks, getNotArchiveTasks, getFavoriteTasks, getOverDueTasks, getRepeatingTasks, getTasksByFilter};
