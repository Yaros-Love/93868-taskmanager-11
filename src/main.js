import API from './api.js';
import BoardComponent from "./components/board.js";
import FilterController from "./controllers/filter.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import StatisticsComponent from "./components/statistics";
// import {generateTasks} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";
import BoardController from "./controllers/board.js";
import TasksModel from "./models/tasks.js";

// const TASK_COUNT = 55;
const AUTHORIZATION = `Basic dXNlck786gffytfyg`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuComponent();
render(siteHeaderElement, siteMenuComponent);


const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();
const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent);

const boardController = new BoardController(boardComponent, tasksModel, api);

const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

api.getTasks()
  .then((tasks) => {
    console.log(tasks)
    tasksModel.setTasks(tasks);
    boardController.render();
  })


