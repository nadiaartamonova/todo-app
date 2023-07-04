import {createRow} from './createElements.js';
import {render} from './render.js';
import {getStorage, setStorage, removeStorage} from './storage.js';

export const loginFormControl = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newUser = {};
    formData.forEach((value, key) => {
      newUser[key] = value;
    });


    form.reset();
    form.style.display = 'none';

    render(newUser.name);
  });
};

export const taskFormControl = (username, form) => {
  const formData = new FormData(form);

  const newTask = {
    id: Math.random().toString().substring(2, 10),
    task: formData.get('task'),
    priority: formData.get('priority'),
    status: 'в процессе',
  };
  setStorage(username, newTask);

  const tbody = document.querySelector('tbody');
  const row = createRow(newTask, getStorage(username).length - 1);
  tbody.append(row);


  form.reset();
};

export const todoInputControl = (username, input, taskForm) => {
  const addButton = document.querySelector('.addtask');

  input.addEventListener('keyup', (e) => {
    input.addEventListener('input', updateButtonState(input, addButton));
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!addButton.disabled) {
        taskFormControl(username, taskForm);
        input.value = '';
        updateButtonState(input, addButton);
      }
    }
  });

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!addButton.disabled) {
      taskFormControl(username, taskForm);
      input.value = '';
      updateButtonState(input, addButton);
    }
  });
};

// eslint-disable-next-line require-jsdoc
function updateButtonState(input, addButton) {
  if (input.value === undefined || input.value.trim() === '') {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
}

export const deleteTask = (userName, table) => {
  table.addEventListener('click', (e) => {
    if (e.target.closest('.delete')) {
      const task = e.target.closest('.table-row');
      const id = task.querySelector('.task-id').textContent;

      removeStorage(userName, id);

      const tbody = table.querySelector('tbody');
      tbody.innerHTML = '';
      const data = JSON.parse(localStorage.getItem(userName));

      if (data && Array.isArray(data)) {
        data.forEach((item, index) => {
          tbody.append(createRow(item, index));
        });
      }
      console.log(tbody);
    }
  });
};

export const successTask = (userName, table) => {
  table.addEventListener('click', (e) => {
    if (e.target.closest('.success')) {
      const taskRow = e.target.closest('.table-row');
      const id = taskRow.querySelector('.task-id').textContent;
      const data = JSON.parse(localStorage.getItem(userName));
      const updatedData = data.map(item => {
        if (item.id === id) {
          const btnSuccess = taskRow.querySelector('.success');

          if(item.status === 'выполнено'){
            btnSuccess.innerText = 'Завершить';
            item.status = 'в процессе';
            const status = taskRow.querySelector('.status');
            taskRow.classList.remove('table-success');
            
            if (item.priority === 'important') {
              taskRow.classList.add('table-warning');
            } else if (item.priority === 'immediately') {
              taskRow.classList.add('table-danger');
            } else {
              taskRow.classList.add('table-light');
            }

            const task = taskRow.querySelector('.task');
            task.classList.remove('text-decoration-line-through');
            status.innerHTML = `в процессе <span class="task-id" style="display: none;">${item.id}</span>`;


          } else {
            item.status = 'выполнено';
            btnSuccess.innerText = 'в процессе';
            const status = taskRow.querySelector('.status');
            taskRow.classList.remove('table-light', 'table-warning', 'table-danger');
            taskRow.classList.add('table-success');
            const task = taskRow.querySelector('.task');
            task.classList.add('text-decoration-line-through');
            status.innerHTML = `выполнено <span class="task-id" style="display: none;">${item.id}</span>`;
          }

          
        }
        return item;
      });

      localStorage.setItem(userName, JSON.stringify(updatedData));
    }
  });
};

export const editTask = (userName, table) => {
  table.addEventListener('click', (e) => {
    const editButton = e.target.closest('.edit');
    if (editButton) {
      const task = editButton.closest('.table-row');
      const taskId = task.querySelector('.task-id').textContent;
      const taskContent = task.querySelector('.task');

      if (editButton.textContent === 'Правка') {
        editButton.textContent = 'Сохранить';
        taskContent.setAttribute('contenteditable', 'true');
        taskContent.focus();
      } else {
        const newTaskContent = taskContent.textContent;

        const data = JSON.parse(localStorage.getItem(userName));
        const updatedData = data.map((item) => {
          if (item.id === taskId) {
            item.task = newTaskContent;
          }
          return item;
        });
        localStorage.setItem(userName, JSON.stringify(updatedData));

        taskContent.removeAttribute('contenteditable');
        editButton.textContent = 'Правка';
      }
    }
  });
};


