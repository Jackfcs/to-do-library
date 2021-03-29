import {displayProjects, render} from './domdisplay.js'
import {projectCapture, todoCapture, saveData, selectCurrentProject} from './datacapture.js'

export const modalEvents = (function () {
    const todoModal = document.getElementById('todo-modal');
    const projectModal = document.getElementById('project-modal')

    const newTodoButton = document.getElementById('add-todo-button');
    const confirmTodoButton = document.getElementById('confirm-todo');
    const newProjectButton = document.getElementById('add-project-button');
    const confirmProjectButton = document.getElementById('confirm-project')

    function hideModal(element) {
        element.classList.add('hide');
    };

    function displayModal(element) {
        element.classList.remove('hide');
    };

    //bring up new project input
    newProjectButton.addEventListener('click', () => {
        displayModal(projectModal);
    });

    //confirm new project
    confirmProjectButton.addEventListener('click', () => {
        hideModal(projectModal);
    });

    //bring up new todo input
    newTodoButton.addEventListener('click', () => {
        displayModal(todoModal);
    });

    //confirm new todo
    confirmTodoButton.addEventListener('click', () => {
        hideModal(todoModal);
        todoCapture();   
        render();   

    });

})();


