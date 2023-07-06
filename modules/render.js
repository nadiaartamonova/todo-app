import {createTaskForm, createTable} from './createElements.js';
import
{todoInputControl, successTask, deleteTask, editTask} from './control.js';

export const render = (userName) => {
  const appContainer = document.querySelector('.app-container');
  const taskForm = createTaskForm(userName);
  appContainer.append(taskForm);

  const todoInput = document.querySelector('.todoinput');
  todoInputControl(userName, todoInput, taskForm);

  const table = createTable(userName);
  appContainer.append(table);
  successTask(userName, table);
  deleteTask(userName, table);
  editTask(userName, table);
};
