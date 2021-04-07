const ProjectInstance = (name, dueDate, moreInfo, todos, completedTodos) => {
    todos = [];
    completedTodos = [];
    return {name, dueDate, moreInfo, todos, completedTodos
    }
};


const TodoInstance = (name, dueDate, priority, checkBox) => {
    return {name, dueDate, priority, checkBox}
};


export {ProjectInstance, TodoInstance};