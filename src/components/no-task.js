import {creteNoTaskTemplate} from '../templates/no-task.js';
import AbstractComponent from '../components/abstract-component.js';


export default class NoTask extends AbstractComponent {
  getTemplate() {
    return creteNoTaskTemplate();
  }
}
