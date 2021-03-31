import {displayProjects, render} from './domdisplay.js'
import {projectCapture, todoCapture, selectCurrentProject} from './datacapture.js'

export const modalEvents = (function () {
    const todoModal = document.getElementById('todo-modal');
    const projectModal = document.getElementById('project-modal');

    const projectForm = document.getElementById('project-form');
    const todoForm = document.getElementById('todo-form');

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

    //Display new project input
    newProjectButton.addEventListener('click', () => {
        displayModal(projectModal);
        projectForm.reset();
    });

    //confirm new project
    confirmProjectButton.addEventListener('click', () => {
        hideModal(projectModal);
        displayProjects.addToDom();
    });

    //Display new todo input
    newTodoButton.addEventListener('click', () => {
        selectCurrentProject.currentProject = projectCapture.myProjects[0];
        displayModal(todoModal);
        todoForm.reset();
    });
    
    //confirm new todo
    confirmTodoButton.addEventListener('click', () => {
        hideModal(todoModal);
        todoCapture();   
        displayProjects.displayTodos();

    });

})();


