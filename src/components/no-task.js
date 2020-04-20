import {createElement} from '../utils.js';
import {creteNoTaskTemplate} from '../templates/no-task.js';


export default class NoTask {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return creteNoTaskTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
