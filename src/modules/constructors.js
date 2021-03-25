const ProjectInstance = (name, dueDate, moreInfo, todos) => {
    todos = [];
    return {name, dueDate, moreInfo, todos}
};


const TodoInstance = (name, dueDate, priority, checkBox, moreInfo) => {
    return {name, dueDate, priority, checkBox, moreInfo}
};


export {ProjectInstance, TodoInstance};