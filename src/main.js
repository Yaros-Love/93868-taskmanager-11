

import { createSiteMenuTemplate } from "./components/site-menu.js";
import { createFilterTemplate } from "./components/filter.js";
import { createBoardTemplate } from "./components/board.js";
import { createTaskTemplate } from "./components/task.js";
import { createTaskEditTemplate } from "./components/task-edit.js";
import { createLoadMoreButtonTemplate } from "./components/load-more-button.js";
import { generateFilters } from "./mock/filter.js";
import { generateTasks } from "./mock/task.js"

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]));

for (let i = 1; i < tasks.length; i++) {
  render(taskListElement, createTaskTemplate(tasks[i]));
}

render(boardElement, createLoadMoreButtonTemplate());
