import Task from "../models/task";


const isOnline = () => {
  return window.navigator.onLine;
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    if (isOnline()) {
      return this._api.getTasks()
        .then((tasks) => {
          tasks.forEach((task) => this._store.setItem(task.id, task.toRAW()))

          return tasks;
        });
    }

    const storeTasks = Object.values(this._store.getItems());
    return Promise.resolve(Task.parseTasks(storeTasks));
  }

  createTask() {
    if (isOnline()) {
      return this._api.createTask();
    }

    // TODO: need to realize off-line state
    return Promise.reject(`offline logic is not implemented`);
  }

  updateTask(id, task) {
    if (isOnline()) {
      return this._api.updateTask(id, task);
    }

    // TODO: need to realize off-line state
    return Promise.reject(`offline logic is not implemented`);
  }

  deleteTask(id) {
    if (isOnline()) {
      return this._api.deleteTask(id);
    }

    // TODO: need to realize off-line state
    return Promise.reject(`offline logic is not implemented`);
  }
}
