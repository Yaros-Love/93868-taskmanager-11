import AbstractComponent from "./abstract-component.js";
import {createTaskTemplate} from "../templates/task.js";


export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTaskTemplate();
  }
}

