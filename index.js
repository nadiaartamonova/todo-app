import {loginFormControl} from './modules/control.js';
import {createLoginForm} from './modules/createElements.js';


const init = () => {
  const appContainer = document.querySelector('.app-container');
  // eslint-disable-next-line max-len
  appContainer.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');
  const loginForm = createLoginForm();
  appContainer.append(loginForm);
  loginFormControl(loginForm);
};

init();
