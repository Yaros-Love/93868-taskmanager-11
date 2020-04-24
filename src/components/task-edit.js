import {createTaskEditTemplate} from '../templates/task-edit.js';
import AbstractComponent from '../components/abstract-component.js';


export default class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}
