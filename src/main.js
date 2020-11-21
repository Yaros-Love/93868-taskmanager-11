import SiteMenuComponent from './components/site-menu.js';
import LoadMoreButtonComponent from './components/load-more_button.js';
import BoardComponent from './components/board.js';
import BoardController from './controllers/board.js';
import SortComponent from './components/sort.js';
import TaskListComponent from './components/task-list.js';
import FilterComponent from './components/filter.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/task-edit.js';
import NoTaskComponent from './components/no-task.js';
import {generateFilters} from './moks/filter.js';
import {generateTask} from './moks/task.js';
import {render, replace, remove, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// const renderTask = (taskListElement, task) => {
//   const taskComponent = new TaskComponent(task);
//   const taskEditComponent = new TaskEditComponent(task);

//   const replaceCardToForm = () => {
//     replace(taskEditComponent, taskComponent);
//   };

//   const replaceFormToCard = () => {
//     replace(taskComponent, taskEditComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       replaceFormToCard();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   taskComponent.setEditButtonClickHandler(() => {
//     replaceCardToForm();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   taskEditComponent.setSubmitHandler((evt) => {
//     evt.preventDefault();
//     replaceFormToCard();
//     document.removeEventListener(`keudown`, onEscKeyDown);
//   });

//   render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
// };

// const renderBoard = (boardComponent, tasks) => {
//   if (tasks.every((task) => task.isArchive)) {
//     render(boardComponent.getElement(), new NoTaskComponent(), RenderPosition.AFTERBEGIN);
//     return;
//   }

//   const taskListComponent = new TaskListComponent();
//   render(boardComponent.getElement(), taskListComponent, RenderPosition.BEFOREEND);
//   render(boardComponent.getElement(), new SortComponent(), RenderPosition.AFTERBEGIN);

//   tasks
//     .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
//     .forEach((task) => renderTask(taskListComponent.getElement(), task));

//   if (tasks.length > TASK_COUNT_PER_STEP) {
//     let renderTaskCount = TASK_COUNT_PER_STEP;

//     const loadMoreButtonComponent = new LoadMoreButtonComponent();

//     render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

//     loadMoreButtonComponent.setClickHandler(() => {
//       tasks
//         .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
//         .forEach((task) => renderTask(taskListComponent.getElement(), task));

//       renderTaskCount += TASK_COUNT_PER_STEP;

//       if (renderTaskCount >= tasks.length) {
//         remove(loadMoreButtonComponent);
//       }
//     });
//   }
// };

const filters = generateFilters();
const tasks = new Array(TASK_COUNT).fill().map(generateTask);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
