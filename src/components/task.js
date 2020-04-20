import {createTaskTemplate} from '../templates/task.js';
import AbstractComponent from '../components/abstract-component.js';


export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card_btn--edit`).addEventListener(`click`, handler);
  }
}
