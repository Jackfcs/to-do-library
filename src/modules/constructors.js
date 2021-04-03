const ProjectInstance = (name, dueDate, moreInfo, todos, completedTodos) => {
    todos = [];
    completedTodos = [];
    return {name, dueDate, moreInfo, todos, completedTodos
    }
};


const TodoInstance = (name, dueDate, priority, checkBox, moreInfo) => {
    return {name, dueDate, priority, checkBox, moreInfo}
};


export {ProjectInstance, TodoInstance};