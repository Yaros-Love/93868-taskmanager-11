import AbstractComponent from '../components/abstract-component.js';
import {createBoardTemplate} from '../templates/board.js';


export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
