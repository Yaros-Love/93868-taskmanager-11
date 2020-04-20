import AbstractComponent from '../components/abstract-component.js';
import {createFilterTemplate} from '../templates/filter.js';


export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

