import { displayProjects, render } from './domdisplay.js'
import { projectCapture, todoCapture, selectCurrentProject } from './datacapture.js'
import { format } from 'date-fns'
import add from 'date-fns/add'
import { ProjectInstance, TodoInstance } from './constructors.js';

export const modalEvents = (function () {
    const todoModal = document.getElementById('todo-modal');
    const projectModal = document.getElementById('project-modal');

    const projectForm = document.getElementById('project-form');
    const todoForm = document.getElementById('todo-form');
    const editTodoForm = document.getElementById('edit-todo-form');

    const newTodoButton = document.getElementById('add-todo-button');
    const confirmTodoButton = document.getElementById('confirm-todo');
    const newProjectButton = document.getElementById('add-project-button');
    const confirmProjectButton = document.getElementById('confirm-project');
    const editTodoButton = document.getElementById('confirm-edit-todo');

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
        const projectName = document.getElementById('project-name-input').value;

        if (projectName === '') {
            alert('Select Project Name')
        } else {
            hideModal(projectModal);
            displayProjects.addToDom();
        }
    });

    //Display new todo input
    newTodoButton.addEventListener('click', () => {
        if (selectCurrentProject.currentProject.name == '') {
            alert('Select a project to add new to-do.')
        } else {

            displayModal(todoModal);
            todoForm.reset();
        }
    });

    //confirm new todo
    confirmTodoButton.addEventListener('click', () => {

        const todoNameInput = document.getElementById('todo-name-input').value;

        if (todoNameInput === '') {
            alert('Select Todo Name');
        } else {
            hideModal(todoModal);
            todoCapture();
            displayProjects.displayTodos();

        }
    });



})();


export const filterTasks = (function () {
    const todoFilter = document.getElementById('todo-filter');

    todoFilter.addEventListener('change', () => {
        //Filter by Name
        if (todoFilter.value == 'name') {
            selectCurrentProject.currentProject.todos.sort(function (a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
        }

        //Filter by Date
        if (todoFilter.value == 'date') {

            selectCurrentProject.currentProject.todos.sort(function (a, b) {
                if (a.dueDate == '') {
                    return 1
                } else {
                    return parseFloat(a.dueDate) - parseFloat(b.dueDate);
                }
            })

        }

        //Filter by priority
        if (todoFilter.value == 'priority') {
            const sortOrder = ['low', 'medium', 'high'];
            const sortObject = data => data.reduce((obj, item, index) => {
                return {
                    ...obj,
                    [item]: index
                }
            }, {});

            const customSort = ({ data, sortOrder, sortField }) => {
                const sortByObject = sortOrder.reduce((obj, item, index) => {
                    return {
                        ...obj,
                        [item]: index
                    }
                }, {})
                return data.sort((a, b) => sortByObject[b[sortField]] - sortByObject[a[sortField]])
            }

            (customSort({ data: selectCurrentProject.currentProject.todos, sortOrder, sortField: 'priority' }));
        }
        render();
        projectCapture.saveProjects();
    });



})();

const filterTodos = (function () {
    const todayBtn = document.getElementById('today');
    const fiveDayBtn = document.getElementById('next-week');
    

    todayBtn.addEventListener('click', () => {
        let todayFilter = []

        for (let parent of projectCapture.myProjects) {
            for (let todos of parent.todos) {
                if (todos.dueDate === format(new Date(), 'dd/MM/yyyy'))
                    todayFilter.push(todos)
            }
        }

        let filteredProject = ProjectInstance('', '', '')
        filteredProject.todos = todayFilter;
        selectCurrentProject.currentProject = filteredProject;
        render();
    })



    fiveDayBtn.addEventListener('click', () => {
        let daysFilter = []
        let futureTime = add(new Date(), {
            weeks:1
        })

        for (let parent of projectCapture.myProjects) {
            for (let todos of parent.todos) {
                if (todos.dueDate != '' && todos.dueDate < format(new Date(futureTime), 'dd/MM/yyyy'))
                
                    daysFilter.push(todos)
            }
        }


        let filteredProject = ProjectInstance('', '', '')
        filteredProject.todos = daysFilter;
        selectCurrentProject.currentProject = filteredProject;
        render();
    })



})();

