import {createTaskEditTemplate, isAllowableDescriptionLength} from '../templates/task-edit.js';
import AbstractSmartComponent from '../components/abstract-smart-component.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};


export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._submitHandler = null;
    this._externalData = DefaultData;
    this._deleteButtonHandler = null;
    this._currentDescription = task.description;
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._task.dueDate || `today`,
      });
    }
  }
  getTemplate() {
    return createTaskEditTemplate(this._task, {
      activeRepeatingDays: this._activeRepeatingDays,
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      currentDescription: this._currentDescription,
      externalData: this._externalData,
    });
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._currentDescription = task.description;

    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.card__form`);

    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__delete`)
      .addEventListener(`click`, handler);

    this._deleteButtonHandler = handler;
  }
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__text`).addEventListener(`input`, (evt) => {
      this._currentDescription = evt.target.value;

      const saveButton = element.querySelector(`.card__save`);
      saveButton.disabled = !isAllowableDescriptionLength(this._currentDescription);
    });

    element.querySelector(`.card__date-deadline-toggle`).
      addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`).
      addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;

        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }
}
