import { ProjectInstance, TodoInstance } from './constructors.js';
import { render } from './domdisplay.js';


export const projectCapture = (function () {

    const confirmProjectButton = document.getElementById('confirm-project');

    let houseWork = ProjectInstance('House Work', '06/12/22', 'Need to clean the whole house');

    let myProjects = [houseWork];

    //Create new project and add to array
    confirmProjectButton.addEventListener('click', () => {
        const projectName = document.getElementById('project-name').value;
        const projectDueDate = document.getElementById('project-due-date').value;
        const projectDescription = document.getElementById('project-description').value;

        let newProject = ProjectInstance(projectName, projectDueDate, projectDescription);
        myProjects.push(newProject);
        selectCurrentProject.currentProject = newProject;
        saveProjects();
        render();

    });



    //Saves project array
    function saveProjects() {
        localStorage.setItem('myProjects', JSON.stringify(myProjects));
    }

    if (!localStorage.myProjects) {
        return
    } else {
        myProjects = JSON.parse(window.localStorage.getItem('myProjects'));
    }


    return {
        myProjects,
        saveProjects
    }

})();



export const selectCurrentProject = (function () {

    let currentProject = projectCapture.myProjects[0];

    return {
        currentProject
    }

})();



export function todoCapture() {

    const todoName = document.getElementById('todo-name').value
    const todoDueDate = document.getElementById('todo-due-date').value
    const todoPriority = document.getElementById('priority-select').value
    const todoCheckbox = false;
    const todoDescription = document.getElementById('todo-info').value

    let newTodo = TodoInstance(todoName, todoDueDate, todoPriority, todoCheckbox, todoDescription)
    selectCurrentProject.currentProject.todos.push(newTodo);

    projectCapture.saveProjects();



}


