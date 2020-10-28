import {createBoardTemplate} from './components/board.js';
import {createFilterTemplate} from './components/filter.js';
import {createLoadMoreButtonTemplate} from './components/load-more_button.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {generateFilters} from './moks/filter.js';
import {generateTasks} from './moks/task.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const tastListElement = document.querySelector(`.board__tasks`);
const boardElement = document.querySelector(`.board`);

render(tastListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
.forEach((task) => render(tastListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
  .forEach((task) => render(tastListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
