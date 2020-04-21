import AbstractComponent from "./abstract-component.js";
import {createTasksTemplate} from "../templates/tasks.js";


export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}

