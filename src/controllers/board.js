import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/task-edit.js';
import NoTaskComponent from '../components/no-task.js';
import TaskListComponent from '../components/task-list.js';
import SortComponent from '../components/sort.js';
import LoadMoreButtonComponent from '../components/load-more_button.js';
import {replace, render, remove, RenderPosition} from '../utils/render.js';

const TASK_COUNT_PER_STEP = 8;

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const replaceCardToForm = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToCard = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.setEditButtonClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keudown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  if (tasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskComponent(), RenderPosition.AFTERBEGIN);
    return;
  }

  const taskListComponent = new TaskListComponent();
  render(boardComponent.getElement(), taskListComponent, RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new SortComponent(), RenderPosition.AFTERBEGIN);

  tasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((task) => renderTask(taskListComponent.getElement(), task));

  if (tasks.length > TASK_COUNT_PER_STEP) {
    let renderTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonComponent();

    render(boardComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      tasks
        .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(taskListComponent.getElement(), task));

      renderTaskCount += TASK_COUNT_PER_STEP;

      if (renderTaskCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    renderBoard(this._container, tasks);
  }
}
