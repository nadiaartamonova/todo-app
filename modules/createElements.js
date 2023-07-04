export const createLoginForm = () => {
  const form = document.createElement('form');

  form.insertAdjacentHTML('beforeend', `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добро пожаловать!<br> Пожалуйста, введите имя пользователя </h5>
        </div>
        <div class="modal-body">
              
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Имя пользователя:</label>
            <input type="text" class="form-control" name = "name">
            <div id="emailHelp" class="form-text"> </div>
          </div>
          <button type="submit" class="btn btn-primary">Войти</button>
              
        </div>
      </div>
    </div>
`);

  return form;
};

export const createTaskForm = (userName) => {
  const form = document.createElement('form');
  form.insertAdjacentHTML('beforeend', `
    <form class="d-flex align-items-center mb-3">
        <h3>${userName} Todo App</h3>
        <label class="form-group me-3 mb-0">
          <input type="text" name="task" class="form-control todoinput" placeholder="ввести задачу">
        </label>
        <select name="priority">
          <option value="usually">обычная</option>
          <option value="important">важная</option>
          <option value="immediately">срочная</option>
        </select>

        <button type="submit" class="btn btn-primary me-3 addtask" disabled>
          Сохранить
        </button>

        <button type="reset" class="btn btn-warning">
          Очистить
        </button>
      </form>
  `);

  return form;
};

export const createRow = (item, index) => {
  const {id, task, priority, status} = item;
  const row = document.createElement('tr');
  row.classList.add('table-row');
  if (status === 'выполнено') {
    row.classList.add('table-success');
  } else {
    if (priority === 'important') {
      row.classList.add('table-warning');
    } else if (priority === 'immediately') {
      row.classList.add('table-danger');
    } else {
      row.classList.add('table-light');
    }
  }

  const indexCell = document.createElement('td');
  indexCell.textContent = index + 1;
  const taskCell = document.createElement('td');
  taskCell.classList.add('task');
  taskCell.textContent = task;
  if (status === 'выполнено') {
    taskCell.classList.add('text-decoration-line-through');
  }

  const statusCell = document.createElement('td');
  statusCell.classList.add('status');
  statusCell.textContent = status;
  const idCell = document.createElement('span');
  idCell.style.display = 'none';
  idCell.textContent = id;
  idCell.classList.add('task-id');
  statusCell.append(idCell);

  const actionsCell = document.createElement('td');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'delete');
  deleteButton.type = 'reset';
  deleteButton.textContent = 'Удалить';

  const completeButton = document.createElement('button');
  completeButton.classList.add('btn', 'btn-success', 'success');
  completeButton.type = 'submit';
  if (status === 'выполнено') {
    completeButton.textContent = 'в процессе';
  } else {
    completeButton.textContent = 'Завершить';
  }
  

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-warning', 'edit');
  editButton.type = 'submit';
  editButton.textContent = 'Правка';
  editButton.setAttribute('contenteditable', 'true');

  actionsCell.appendChild(deleteButton);
  actionsCell.appendChild(completeButton);
  actionsCell.appendChild(editButton);
  row.append(indexCell);
  row.append(taskCell);
  row.append(statusCell);
  row.append(actionsCell);

  return row;
};

export const createTableRows = (username) => {
  const tbody = document.createElement('tbody');
  const data = JSON.parse(localStorage.getItem(username));

  if (data && Array.isArray(data)) {
    data.forEach((item, index) => {
      tbody.append(createRow(item, index));
    });
  }
  return tbody;
};

export const createTable = (username, rows) => {
  const tableContainer = document.createElement('div');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['№', 'Задача', 'Статус', 'Действия'];

  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = createTableRows(username);

  table.appendChild(tbody);

  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  tableWrapper.appendChild(table);

  tableContainer.appendChild(tableWrapper);

  return tableContainer;
};
