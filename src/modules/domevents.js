import { displayProjects, render } from './domdisplay.js'
import { projectCapture, todoCapture, selectCurrentProject, dateOrder } from './datacapture.js'
import { format } from 'date-fns'
import add from 'date-fns/add'
import { ProjectInstance} from './constructors.js';

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

    const background = document.getElementById('background')
    const closeProjBtn = document.getElementById('project-modal-close');
    const closeTodoBtn = document.getElementById('todo-modal-close');

    function hideModal(element) {
        element.classList.add('hide');
    };

    function displayModal(element) {
        background
        element.classList.remove('hide');
        background.classList.add('active');
    };

    background.addEventListener('click', () => {
        hideModal(todoModal);
        hideModal(projectModal);
        background.classList.remove('active');
    })

    closeProjBtn.addEventListener('click', () => {
        hideModal(projectModal);
        background.classList.remove('active');
    })

    closeTodoBtn.addEventListener('click', () => {
        hideModal(todoModal);
        background.classList.remove('active');
    })


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
            background.classList.remove('active');
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
            background.classList.remove('active');

        }
    });



})();


export const filterTasks = (function () {

    //Filter Todos
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
                    return dateOrder(a.dueDate) - dateOrder(b.dueDate);
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

    //Filter Projects
    const projectFilter = document.getElementById('project-filter');

    projectFilter.addEventListener('change', () => {
        //Filter by Name
        if (projectFilter.value == 'name') {
            projectCapture.myProjects.sort(function (a, b) {
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
        if (projectFilter.value == 'date') {

            projectCapture.myProjects.sort(function (a, b) {
                if (a.dueDate == '') {
                    return 1
                } else {
                    return parseFloat(a.dueDate) - parseFloat(b.dueDate);
                }
            })

        }

        render();
        projectCapture.saveProjects();
    })



})();

const filterTodos = (function () {
    const todayBtn = document.getElementById('today');
    const weekBtn = document.getElementById('next-week');


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



    weekBtn.addEventListener('click', () => {
        let daysFilter = []
        let futureTime = add(new Date(), {
            weeks: 1
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

const hamburger = (function () {
    const hamburger = document.getElementById('hamburger');
    const projContainer = document.getElementById('project-container');
    const mediaWidthMax = window.matchMedia('(max-width: 800px)');
    const mediaWidthMin = window.matchMedia('(min-width: 800px)');


    hamburger.addEventListener('click', () => {
        if (mediaWidthMax.matches) {
            if (projContainer.style.display === 'none') {
                projContainer.style.display = 'block';
            } else if (projContainer.style.display = 'block') {

                projContainer.style.display = 'none'
            }
        }

    })

    function increaseSize() {
        if (mediaWidthMin.matches) {
            projContainer.style.display = 'block';
            projContainer.style.width = '270px';
        }
        if (mediaWidthMax.matches) {
            projContainer.style.display = 'none';
        }

    }
    window.onresize = increaseSize;

})();

// const dateColor = (function () {
//     let todos = selectCurrentProject.currentProject.todos
//     let dueDateText = document.querySelectorAll('.due-date-text');

//     const firstText = document.getElementsByClassName('due-date-text0')
//     firstText.style.color = 'red'

//     console.log(dueDateText)
//     for (let i = 0; i < dueDateText.length; i++) {

//         let todoDate = todos[i].dueDate;
//         let newDate;
//         if (todoDate === '') {
//             newDate = '';
//         } else {
//             newDate = todoDate;
//         }
//         //Due Date Warning Text
//         const todoWarningText = document.createElement('span');
//         todoWarningText.setAttribute('id', 'todo-warning')

//         if (newDate === format(new Date(), 'dd/MM/yyyy')) {
//             dueDateText.style.color = 'Orange';
//             dueDate.appendChild(todoWarningText);
//             todoWarningText.textContent = 'Todo is due today!'
//         }

//         function process(date) {
//             var parts = date.split("/");
//             return new Date(parts[2], parts[1] - 1, parts[0]);
//         }



//         // let d1 = Date.parse(newDate)
//         // let d2 = Date.parse(format(new Date(), 'dd/MM/yyyy'))

//         let d1 = process(newDate)
//         let d2 = process(format(new Date(), 'dd/MM/yyyy'))

//         //if (newDate < ) {
//         if (d1 < d2) {
//             dueDateText.style.color = 'Red';
//             dueDate.appendChild(todoWarningText);
//             todoWarningText.textContent = 'Todo is overdue!';
//         }

//         console.log('d1 ' + [i] + ': ' + d1)
//         console.log('d2: ' + [i] + ': ' + d2)

//         console.log(newDate)
//     }
// })();



// //     for (let i = 0; i < todos.length; i++) {


// //         let todoDate = todos[i].dueDate;
// //         let newDate;
// //         if (todoDate === '') {
// //             newDate = '';
// //         } else {
// //             newDate = todoDate;
// //         }
// //         //Due Date Warning Text
// //         const todoWarningText = document.createElement('span');
// //         todoWarningText.setAttribute('id', 'todo-warning')


// //         if (newDate === format(new Date(), 'dd/MM/yyyy')) {
// //             dueDateText.style.color = 'Orange';
// //             dueDate.appendChild(todoWarningText);
// //             todoWarningText.textContent = 'Todo is due today!'
// //         }

// //         function process(date){
// //             var parts = date.split("/");
// //             return new Date(parts[2], parts[1] - 1, parts[0]);
// //          }



// //         // let d1 = Date.parse(newDate)
// //         // let d2 = Date.parse(format(new Date(), 'dd/MM/yyyy'))

// //         let d1 = process(newDate)
// //         let d2 = process(format(new Date(), 'dd/MM/yyyy'))

// //         //if (newDate < ) {
// //         if (d1 < d2) {
// //             dueDateText.style.color = 'Red';
// //             dueDate.appendChild(todoWarningText);
// //             todoWarningText.textContent = 'Todo is overdue!';
// //         }

// //         console.log('d1 ' + [i] + ': ' + d1)
// //         console.log('d2: ' + [i] + ': ' + d2)

// //         console.log(newDate)
// //     }
// // })();
