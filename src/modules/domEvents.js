

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


    newTodoButton.addEventListener('click', () => {
        displayModal(todoModal);
    });


    confirmTodoButton.addEventListener('click', () => {
        hideModal(todoModal);
    });

    newProjectButton.addEventListener('click', () => {
        displayModal(projectModal);
    });


    confirmProjectButton.addEventListener('click', () => {
        hideModal(projectModal);
    });

})();

