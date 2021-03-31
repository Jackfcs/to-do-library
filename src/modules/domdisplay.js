
import { projectCapture, selectCurrentProject } from './datacapture.js'
import { format } from 'date-fns'


export const displayProjects = (function () {
    const projectParent = document.getElementById('project-parent');

    //Display projects in project container

    function addToDom() {

        projectParent.innerHTML = ''



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
            newSpan.textContent = format(new Date(newDate), 'PPP');

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


        }

    }



    const todoParent = document.getElementById('todo-parent');

    function displayTodos() {

        todoParent.innerHTML = '';

        if (selectCurrentProject.currentProject === undefined) {
            selectCurrentProject.currentProject = projectCapture.myProjects[0]
        }
        let todos = selectCurrentProject.currentProject.todos

        const todoHeader = document.getElementById('todo-header');
        todoHeader.innerHTML = '';
        todoHeader.textContent = `${selectCurrentProject.currentProject.name} To-dos`

        for (let i = 0; i < todos.length; i++) {

            const todoHeader = document.getElementById('todo-header');

            //Todo title
            todoHeader.textContent = `${selectCurrentProject.currentProject.name} To-dos`
            
            let todoDate = todos[i].dueDate;
            let newDate = format(new Date(todoDate), 'PPP')

            const newTodo = document.createElement('div');
            todoParent.appendChild(newTodo);
            newTodo.innerHTML = `
            <div class="todo-instance">
                    <span class="project-name">${todos[i].name}</span> <br>

                    <span class="duedate">Due Date - ${newDate}</span>

                    <form>
                        <label for="priority">Priority</label>
                        <select name="priority" id="priority-select">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </form>
                    <div>
                        <label for="completed">Complete</label>
                        <input type="checkbox" name="completed">
                    </div>
                </div>`;

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