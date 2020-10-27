import {createSiteMenuTemplate} from './components/site-menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/task-edit.js';
import {createLoadMoreButtonTemplate} from './components/load-more_button.js';
import {generateFilters} from './moks/filter.js';
import {generateTasks} from './moks/task.js';

const TASK_COUNT = 3;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT)
console.log(tasks)

render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const tastListElement = document.querySelector(`.board__tasks`);
const boardElement = document.querySelector(`.board`);

render(tastListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i=1; i < tasks.length; i++) {
  render(tastListElement, createTaskTemplate(tasks[i]), `beforeend`);
};

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
