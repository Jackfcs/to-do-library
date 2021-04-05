import { ProjectInstance, TodoInstance } from './constructors.js';
import { render } from './domdisplay.js';
import { format } from 'date-fns';


export const projectCapture = (function () {

    const confirmProjectButton = document.getElementById('confirm-project');

    let houseWork = ProjectInstance('House Work', '06/12/22', 'Need to clean the whole house');

    let myProjects = [houseWork];

    //Create new project and add to array
    confirmProjectButton.addEventListener('click', () => {
        const projectName = document.getElementById('project-name').value;
        let projectDueDate
        if (document.getElementById('project-due-date').value === '') {
            projectDueDate = '';
        } else {
            projectDueDate = format(new Date(document.getElementById('project-due-date').value), 'P');
        }
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
        console.log('hi')
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


//Capture Priority Select value 
const todoPriorityValue = (function () {
    const todoPriority = document.getElementById('priority-select')
    // todoPriority.addEventListener('change', () => {
    //     console.log('.value ' + todoPriority.value)


    // })
    return todoPriority
})();


export function todoCapture() {

    const todoName = document.getElementById('todo-name').value;
    let todoDueDate;
    if (document.getElementById('todo-due-date').value === '') {
        todoDueDate = ''
    } else {
        todoDueDate = format(new Date(document.getElementById('todo-due-date').value), 'P');
    }
    const todoPriority = todoPriorityValue.value;
    const todoCheckbox = false;
    const todoDescription = document.getElementById('todo-info').text

    let newTodo = TodoInstance(todoName, todoDueDate, todoPriority, todoCheckbox, todoDescription)
    selectCurrentProject.currentProject.todos.push(newTodo);
    projectCapture.saveProjects();
    console.log(todoPriority);

    return {
        todoName
    }

};
