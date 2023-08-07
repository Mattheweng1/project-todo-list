import { projectList } from "./creatingProject";



const CreateTask = (projectName, taskName, details, completed, priority, bookmarked, dueDate) => {
    return {
        projectName,
        taskName,
        details,
        completed,
        priority,
        bookmarked,
        dueDate
    }
};

const addTaskToProject = (task) => {
    projectList.find((project) => project.name === task.projectName).taskList.push(task);
};

export {CreateTask, addTaskToProject};