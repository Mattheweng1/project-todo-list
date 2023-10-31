import { projectList, saveToLocalStorage } from "./creatingProject";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = (projectName, taskName, details, completed, priority, bookmarked, dueDate) => {
    const taskID = uuidv4();
    const projectID = projectList.find((project) => project.name === projectName).projectID;
    return {
        projectName,
        projectID,
        taskName,
        details,
        completed,
        priority,
        bookmarked,
        dueDate,
        taskID
    }
};

const addTaskToProject = (task) => {
    projectList.find((project) => project.name === task.projectName).taskList.push(task);
};

const addNewTask = (projectName, taskName, details, completed, priority, bookmarked, dueDate) => {
    const newTask = CreateTask(projectName, taskName, details, completed, priority, bookmarked, dueDate);
    addTaskToProject(newTask);

    saveToLocalStorage();
    
    return newTask;
}

const getProjectFromTaskID = (taskID) => {
    return projectList.find((project) => {
        return project.taskList.some((task) => {
            return task.taskID === taskID;
        })
    })
}

const getTaskFromTaskID = (taskID) => {
    return getProjectFromTaskID(taskID).taskList.find((task) => {
        return task.taskID === taskID;
    })
}

const convertTaskDueDate = (taskDueDate) => {
    const dateArr = taskDueDate.split('-');
    return new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
}

const sortTaskList = (taskList) => {
    // Sort by priority
    taskList.sort((taskA, taskB) => {
        return taskB.priority - taskA.priority;
    })
    // Sort by dueDate
    return taskList.sort((taskA, taskB) => {
        return convertTaskDueDate(taskA.dueDate) - convertTaskDueDate(taskB.dueDate);
    })
}

export { addNewTask, getProjectFromTaskID, getTaskFromTaskID, sortTaskList, convertTaskDueDate };