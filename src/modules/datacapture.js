import { ProjectInstance, TodoInstance } from './constructors.js';
import { render } from './domdisplay.js';
import { format } from 'date-fns';


export const projectCapture = (function () {

    const confirmProjectButton = document.getElementById('confirm-project');

    let houseWork = ProjectInstance('House Work', '28/04/2022', 'Need to clean the whole house');
    let example = ProjectInstance('Example Project Title', format(new Date(), 'dd/MM/yyyy'), 'Description goes here, click to edit.')
    
    

    let myProjects = [example, houseWork];

   


    //Create new project and add to array
    confirmProjectButton.addEventListener('click', () => {
        let projectName;
        if (document.getElementById('project-name-input').value === '') {
            return
        } else {
            projectName = document.getElementById('project-name-input').value;
        }

        let projectDueDate
        if (document.getElementById('project-due-date').value === '') {
            projectDueDate = '';
        } else {
            projectDueDate = format(new Date(document.getElementById('project-due-date').value), 'dd/MM/yyyy');
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
        console.log('')
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
    const todoPriority = document.getElementById('modal-priority-select')

    return todoPriority
})();


export function todoCapture() {

    let todoName;
    if (document.getElementById('todo-name-input').value === '') {
        return
    } else {
        todoName = document.getElementById('todo-name-input').value;
    }

    let todoDueDate;
    if (document.getElementById('todo-due-date').value === '') {
        todoDueDate = ''
    } else {
        todoDueDate = format(new Date(document.getElementById('todo-due-date').value), 'dd/MM/yyyy');
        
    }
    const todoPriority = todoPriorityValue.value;
    const todoCheckbox = false;

    let newTodo = TodoInstance(todoName, todoDueDate, todoPriority, todoCheckbox)
    selectCurrentProject.currentProject.todos.push(newTodo);

    //Example todos
    let vacuum = TodoInstance('Hoover', format(new Date(), 'dd/MM/yyyy'), 'low', false);
    let dust = TodoInstance('Dust', '13/04/2021', 'high', false);
    projectCapture.myProjects.houseWork.todos.push(vacuum, dust);

    let example = TodoInstance('Example Task', format(new Date(), 'dd/MM/yyyy'), 'low', false)
    let example1 = TodoInstance('Click me to edit task', '11/04/2024', 'medium', false)
    let example2 = TodoInstance('This is an overdue task', '11/02/2021', 'high', false)
    projectCapture.myProjects.example.todos.push(example, example1, example2);


    projectCapture.saveProjects();

 


    return {
        todoName
    }

};

export function dateOrder(date){
    let dateString = date;
    let dateParts = dateString.split("/");
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject
}

