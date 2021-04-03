
import { projectCapture, selectCurrentProject } from './datacapture.js'
import { format } from 'date-fns'


export const displayProjects = (function () {
    const projectParent = document.getElementById('project-parent');

    //Display projects in project container

    function addToDom() {

        projectParent.innerHTML = ''

        //Create Project Instances

        for (let i = 0; i < projectCapture.myProjects.length; i++) {

            const newDiv = document.createElement('div');
            const newSpan = document.createElement('span');
            const deleteBtn = document.createElement('button');

            projectParent.appendChild(newDiv);
            newDiv.setAttribute('id', 'project' + i);
            newDiv.classList.add('project-instance');
            newDiv.textContent = projectCapture.myProjects[i].name + ' ';

            newDiv.appendChild(newSpan);
            newSpan.classList.add('project-name');
            let newDate = projectCapture.myProjects[i].dueDate;

            if (newDate === '') {
                newSpan.textContent = newDate;
            } else {
                newSpan.textContent = format(new Date(newDate), 'PPP');
            }
            newDiv.appendChild(deleteBtn);
            deleteBtn.setAttribute('id', 'delete' + i);
            deleteBtn.setAttribute('class', 'projectdelete')
            deleteBtn.innerHTML = '-'

            deleteBtn.addEventListener('click', () => {

                projectCapture.myProjects.splice(i, 1);
                selectCurrentProject.currentProject = projectCapture.myProjects[0];
                projectCapture.saveProjects();
                render();


            })

            newDiv.addEventListener('click', () => {
                selectCurrentProject.currentProject = projectCapture.myProjects[i];
                displayProjects.displayTodos();
                console.log(selectCurrentProject.currentProject)
            })

            const info = document.createElement('button');
            newDiv.appendChild(info);
            info.textContent = 'Show Details';
            info.setAttribute('id', 'project-info-button')
            info.addEventListener('click', () => {
                const description = document.createElement('div');
                alert(projectCapture.myProjects[i].moreInfo)

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
                newDate = format(new Date(todoDate), 'P')
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
            const dueDate = document.createElement('span');
            dueDate.setAttribute('id', 'todo-duedate')
            dueDate.textContent = newDate;
            newTodo.appendChild(dueDate);





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