
import { projectCapture} from './datacapture.js'


export const displayProjects = (function () {
    const projectParent = document.getElementById('project-parent');
    
    
    //Display projects in project container

    function addToDom() {
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
                projectCapture.saveProjects();
            })
            
        }

        
    }
    
    

    return {
        addToDom,
        projectParent
    }

})();


//Selecting Current Project
export const projectSelect = (function() {
    const projects = document.querySelectorAll('project-instance')
    const todoParent = document.getElementById('todo-parent')

    let currentProject = projectCapture.myProjects[1];

    // projectCapture.myProjects.forEach(project => {
    //     project.addEventListener('click', () => {
    //         project


    //     })
    // });

    console.log(currentProject.todos)

    return {
        currentProject
    }
})();

//display todos
const displayTodos = (function () {

    const todoParent = document.getElementById('todo-parent');
    let currentTodoList = projectSelect.currentProject.todos;
    
    
    function addTodoDom () {
        for (let i = 0; i < currentTodoList.length; i++) {
            const newDiv = document.createElement('div');
            todoParent.appendChild(newDiv);
            newDiv.textContent = 'hurray'
        }
    }
    addTodoDom();
    

})();

export function render() {
    displayProjects.projectParent.innerHTML = '';
    displayProjects.addToDom();
    
    
}