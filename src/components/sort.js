import AbstractComponent from '../components/abstract-component.js';
import {createSortTemplate} from '../templates/sort.js';

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
