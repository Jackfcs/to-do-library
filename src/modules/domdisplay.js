
import { projectCapture, todoCapture, selectCurrentProject } from './datacapture.js'



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
            newSpan.textContent = projectCapture.myProjects[i].dueDate;

            newSpan.appendChild(deleteBtn);
            deleteBtn.setAttribute('id', 'delete' + i);
            deleteBtn.innerHTML = '-'

            deleteBtn.addEventListener('click', () => {
                projectCapture.myProjects.splice(i, 1);
                render();
                selectCurrentProject.currentProject = [];
                projectCapture.saveProjects();
            })


            newDiv.addEventListener('click', () => {
                selectCurrentProject.currentProject = projectCapture.myProjects[i];
                console.log(selectCurrentProject.currentProject)
            })



        }


    }

    const todoParent = document.getElementById('todo-parent');

    function displayTodos() {

        todoParent.innerHTML = '';

        for (let i = 0; i < selectCurrentProject.currentProject.todos; i++) {

            const newTodo = document.createElement('div');
            todoParent.appendChild(newTodo);
            newTodo.innerHTML = 'success';


        }
        //console.log(todos)


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