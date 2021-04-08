
import { projectCapture, selectCurrentProject, todoCapture } from './datacapture.js'
import { modalEvents } from './domevents.js'
import { format } from 'date-fns'
import Calendar from '../icons/calendar.png'
import Trash from '../icons/trash.png'
import Trash1 from '../icons/trash1.svg'
import { ProjectInstance } from './constructors.js'
import { intlFormat } from 'date-fns/esm'

export const displayProjects = (function () {
    const projectParent = document.getElementById('project-parent');

    //Display projects in project container

    function addToDom() {

        projectParent.innerHTML = ''

        //Create Project Instances

        for (let i = 0; i < projectCapture.myProjects.length; i++) {

            const projectInstance = document.createElement('div');
            const projectName = document.createElement('span');
            const projectDate = document.createElement('span');
            const deleteBtn = document.createElement('IMG');



            projectParent.appendChild(projectInstance);
            projectInstance.setAttribute('id', 'project' + i);
            projectInstance.classList.add('project-instance');

            //Project Name
            projectInstance.appendChild(projectName);
            projectName.textContent = projectCapture.myProjects[i].name + ' ';


            projectName.addEventListener('dblclick', () => {
                projectName.setAttribute('contentEditable', 'true')
            })

            projectName.setAttribute('id', 'project-name')
            projectName.addEventListener('input', () => {
                projectCapture.myProjects[i].name = projectName.textContent;
                projectCapture.saveProjects();
            })

            //Project date
            projectInstance.appendChild(projectDate);
            //projectDate.classList.add('project-name');
            projectDate.setAttribute('id', 'project-date')
            const editDateButton = document.createElement('IMG');
            editDateButton.src = Calendar;
            editDateButton.width = '15'
            editDateButton.setAttribute('id', 'edit-date-button');
            editDateButton.classList.add('hide')
           

            const editDate = document.createElement('INPUT');
            editDate.setAttribute('id', 'project-date-input')
            editDate.classList.add('hide');
            projectInstance.appendChild(editDateButton);
            projectInstance.appendChild(editDate);
            editDate.setAttribute('type', 'date');
            editDateButton.addEventListener('click', () => {
                editDate.classList.toggle('hide');
                projectDate.classList.toggle('hide');

            })

            if (projectCapture.myProjects[i].dueDate === '') {
                projectDate.textContent = projectCapture.myProjects[i].dueDate;
            } else {
                projectDate.textContent = 'Due: ' + projectCapture.myProjects[i].dueDate;
                
            }

            

            editDate.addEventListener('input', () => {
                projectCapture.myProjects[i].dueDate = format(new Date(editDate.value), 'dd/MM/yyyy');
                projectDate.textContent = 'Due: ' + projectCapture.myProjects[i].dueDate;
                editDate.classList.add('hide');
                projectCapture.saveProjects();
                render();
                
            })
            
            projectInstance.addEventListener('mouseover', () => {
                
                editDateButton.classList.remove('hide')
            })
            projectInstance.addEventListener('mouseleave', () => {
                
                editDateButton.classList.add('hide')
            })
          


            //More info button
            const info = document.createElement('button');
            projectInstance.appendChild(info);
            info.innerHTML = 'Details';
            info.setAttribute('id', 'project-info-button')

            const infoDiv = document.createElement('div');
            infoDiv.textContent = projectCapture.myProjects[i].moreInfo;
            projectParent.appendChild(infoDiv);
            infoDiv.classList.add('hide');

            info.addEventListener('click', () => {
                infoDiv.classList.toggle('hide')
                if (info.innerHTML === 'Details') {
                    info.innerHTML = 'Hide'
                } else {
                    info.innerHTML = 'Details'
                }

            })

            //Delete icon
            projectInstance.appendChild(deleteBtn);
            deleteBtn.setAttribute('id', 'delete' + i);
            deleteBtn.setAttribute('class', 'projectdelete');
            deleteBtn.classList.add('hide');
            deleteBtn.src = Trash1;
            deleteBtn.width = '30'

            deleteBtn.addEventListener('click', () => {

                projectCapture.myProjects.splice(i, 1);
                selectCurrentProject.currentProject = projectCapture.myProjects[0];
                projectCapture.saveProjects();
                render();


            })

            projectInstance.addEventListener('mouseover', () => {
                
                deleteBtn.classList.remove('hide')
            })
            projectInstance.addEventListener('mouseleave', () => {
                
                deleteBtn.classList.add('hide')
            })

            

            //Select current project
            projectInstance.addEventListener('click', () => {
                selectCurrentProject.currentProject = projectCapture.myProjects[i];
                displayProjects.displayTodos();
            })



        }

    }

    //Create todo instances

    const todoParent = document.getElementById('todo-parent');
    const completedParent = document.getElementById('completed-todo');

    function displayTodos() {

        todoParent.innerHTML = '';
        completedParent.innerHTML = '';

        if (selectCurrentProject.currentProject === undefined) {
            selectCurrentProject.currentProject = projectCapture.myProjects[0]
        }




        //Generate todo header

        const todoHeader = document.getElementById('todo-header');

        //Todo title
        todoHeader.textContent = `${selectCurrentProject.currentProject.name} To-dos`



        let todos = selectCurrentProject.currentProject.todos

        for (let i = 0; i < todos.length; i++) {

            let todoDate = todos[i].dueDate;
            let newDate;
            if (todoDate === '') {
                newDate = '';
            } else {
                newDate = todoDate;
            }



            const newTodo = document.createElement('div');
            todoParent.appendChild(newTodo);
            newTodo.classList.add('todo-instance');

            //CheckBox
            const checkParent = document.createElement('div');
            newTodo.appendChild(checkParent);
            const check = document.createElement('INPUT');
            check.setAttribute('type', 'checkbox');
            check.setAttribute('name', 'checkbox');
            check.setAttribute('id', 'checkbox');
            checkParent.appendChild(check);
            check.addEventListener('change', () => {
                selectCurrentProject.currentProject.completedTodos.push(todos[i]);
                todos.splice(i, 1);
                render();
                projectCapture.saveProjects();

            })

            //todo Name
            const todoName = document.createElement('span');
            todoName.textContent = todos[i].name;
            newTodo.appendChild(todoName);
            todoName.setAttribute('id', 'todo-name')
            todoName.setAttribute('contentEditable', 'true');
            todoName.addEventListener('input', () => {
                todos[i].name = todoName.textContent;
                projectCapture.saveProjects();
            });

            //Priority Select
            const select = document.createElement('select');
            select.setAttribute('name', 'priority');
            select.setAttribute('id', 'priority-select')
            newTodo.appendChild(select);
            const low = document.createElement('option');
            const medium = document.createElement('option');
            const high = document.createElement('option');
            low.innerHTML = 'low';
            low.setAttribute('value', 'low');
            select.appendChild(low);
            medium.innerHTML = 'medium';
            medium.setAttribute('value', 'medium');
            select.appendChild(medium);
            high.innerHTML = 'high';
            high.setAttribute('value', 'high');
            select.appendChild(high);


            // display priority colour
            select.value = todos[i].priority;
            if (select.value == 'low') {
                select.style.background = 'green'
            }
            if (select.value == 'medium') {
                select.style.background = 'orange'
            }
            if (select.value == 'high') {
                select.style.background = 'red'
            }
            select.addEventListener('change', (event) => {
                todos[i].priority = select.value;
                if (select.value == 'low') {
                    event.target.style.background = 'green'
                }
                if (select.value == 'medium') {
                    event.target.style.background = 'orange'
                }
                if (select.value == 'high') {
                    event.target.style.background = 'red'
                }
                projectCapture.saveProjects();
            });


            //Due Date
            const dueDate = document.createElement('div');
            dueDate.setAttribute('type', 'date');
            dueDate.setAttribute('id', 'todo-duedate');
            newTodo.appendChild(dueDate);

            const dueDateText = document.createElement('div');
            dueDateText.setAttribute('id', 'due-date-text');
            dueDateText.textContent = newDate;
            if (newDate <= format(new Date(), 'dd/MM/yyyy')) {
                dueDate.style.background = 'red';
            }

            dueDate.appendChild(dueDateText);

            const editDateButton = document.createElement('IMG');
            editDateButton.src = Calendar;
            editDateButton.width = '15'
            editDateButton.classList.add('hide');
            editDateButton.setAttribute('id', 'todo-edit-date-button');
            newTodo.appendChild(editDateButton);

            //Create input for date and clickable calendar icon
            const editDate = document.createElement('INPUT');
            editDate.setAttribute('id', 'edit-date-input')
            editDate.classList.add('hide');
            dueDate.appendChild(editDate);
            editDate.setAttribute('type', 'date');
            editDateButton.addEventListener('click', () => {
                editDate.classList.toggle('hide');
                dueDateText.classList.toggle('hide');

            })

            
            editDate.addEventListener('input', () => {
                todos[i].dueDate = format(new Date(editDate.value), 'dd/MM/yyyy');
                editDate.classList.add('hide');
                render();
                projectCapture.saveProjects();
            })



            newTodo.addEventListener('mouseover', () => {
                
                editDateButton.classList.remove('hide')
            })
            newTodo.addEventListener('mouseleave', () => {
                
                editDateButton.classList.add('hide')
            })


        }


        //display completed todos
        if (selectCurrentProject.currentProject.completedTodos != undefined) {

            let compTodos = selectCurrentProject.currentProject.completedTodos

            for (let i = 0; i < compTodos.length; i++) {

                let todoDate = compTodos[i].dueDate;
                let newDate;
                if (todoDate === '') {
                    newDate = '';
                } else {
                    newDate = format(new Date(todoDate), 'P')
                }


                const newTodo = document.createElement('div');
                completedParent.appendChild(newTodo);
                newTodo.classList.add('todo-instance');

                //CheckBox
                const checkParent = document.createElement('div');
                newTodo.appendChild(checkParent);
                const check = document.createElement('INPUT');
                check.setAttribute('type', 'checkbox');
                check.setAttribute('name', 'checkbox');
                check.setAttribute('id', 'checkbox');
                check.setAttribute('checked', 'true');
                checkParent.appendChild(check);
                check.addEventListener('change', () => {


                    selectCurrentProject.currentProject.todos.push(compTodos[i]);
                    compTodos.splice(i, 1);
                    render();
                    projectCapture.saveProjects();

                })
                //Name
                const todoName = document.createElement('span');
                todoName.textContent = compTodos[i].name;
                newTodo.appendChild(todoName);


            }

        }
    }

    return {
        addToDom,
        projectParent,
        todoParent,
        displayTodos


    }

})();


export function render() {

    displayProjects.todoParent.innerHTML = '';
    displayProjects.projectParent.innerHTML = '';
    displayProjects.addToDom();
    displayProjects.displayTodos();



}