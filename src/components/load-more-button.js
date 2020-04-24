import AbstractComponent from "./abstract-component.js";
import {createLoadMoreButtonTemplate} from '../templates/load-more-button.js';


export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
