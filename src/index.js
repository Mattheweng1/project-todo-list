import { projectList, addNewProject } from "./creatingProject";
import { addNewTask, getProjectFromTaskID } from "./creatingTask";
import { renderEditTaskForm, renderProjectList, renderTaskListFromProject, getRadioValue } from "./render";


addNewProject('Work Stuff');
addNewProject('chores');

const exampleTask = addNewTask('Work Stuff', 'Code project', `more than just some details, but a bunch of other stuff for sure, trust me, you won't be sorry of course, I never lie, hehehehehehehe`, true, '1', true, '1995-12-17');

console.log(exampleTask.taskID);
console.log(exampleTask.taskID);
console.log(getProjectFromTaskID(exampleTask.taskID));
console.log(projectList);

renderProjectList(projectList);

renderTaskListFromProject(getProjectFromTaskID(exampleTask.taskID));

// Submit handling for addProjectForm

const addProjectBtn = document.getElementById('addProject');
const addProjectForm = document.getElementById('addProjectForm');

const submitAddProjectForm = () => {
    const projectName = addProjectForm.elements["addProjectName"].value;
    const newProject = addNewProject(projectName);
    addProjectForm.reset();
    renderProjectList(projectList);
    renderTaskListFromProject(newProject);
}

addProjectForm.addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();
    submitAddProjectForm();
    addProjectForm.classList.add('displayNone');
    addProjectBtn.classList.remove('displayNone');
})

// Toggle addProjectForm event listener

const cancelAddProjectForm = document.getElementById('cancelAddProjectForm');

addProjectBtn.addEventListener('click', () => {
    addProjectBtn.classList.add('displayNone');
    addProjectForm.classList.remove('displayNone');
})

cancelAddProjectForm.addEventListener('click', () => {
    addProjectForm.classList.add('displayNone');
    addProjectBtn.classList.remove('displayNone');

    addProjectForm.reset();
})

// Submit handling for addTaskForm

const addTaskBtn = document.getElementById('addTask');
const addTaskForm = document.getElementById('addTaskForm');

const submitAddTaskForm = () => {
    const projectName = document.getElementById('mainContentTitle').textContent;

    const taskName = addTaskForm.elements["addTaskName"].value;
    const taskDetails = addTaskForm.elements["addTaskDetails"].value;
    const taskDueDate = addTaskForm.elements["addTaskDueDate"].value;
    const taskPriority = getRadioValue('addPriority');

    const newTask = addNewTask(projectName, taskName, taskDetails, false, taskPriority, false, taskDueDate);

    addTaskForm.reset();
    renderTaskListFromProject(getProjectFromTaskID(newTask.taskID));
}

addTaskForm.addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();
    submitAddTaskForm();
    addTaskForm.classList.add('displayNone');
    addTaskBtn.classList.remove('displayNone');
})

// Toggle addTaskForm event listener

const cancelAddTaskForm = document.getElementById('cancelAddTaskForm');

addTaskBtn.addEventListener('click', () => {
    addTaskBtn.classList.add('displayNone');
    addTaskForm.classList.remove('displayNone');
})

cancelAddTaskForm.addEventListener('click', () => {
    addTaskForm.classList.add('displayNone');
    addTaskBtn.classList.remove('displayNone');

    addTaskForm.reset();
})

// Add event listeners to menuToggle

const menuToggle = document.querySelector('.menuToggle');
menuToggle.addEventListener('click', () => {
    const mainMenu = document.querySelector('.mainMenu');
    mainMenu.classList.toggle('hideMenu');
    const mainContent = document.querySelector('.mainContent');
    mainContent.classList.toggle('noMargin');
});

// Close taskMenu when you click off of it

document.addEventListener('click', (event) => {
    const outsideTaskOptionsClick = Array.from(document.querySelectorAll('.taskOptions')).every((taskOptions) => {
        return !(taskOptions.contains(event.target));
    })

    if (document.getElementById('taskMenu')) {
        if (!taskMenu.contains(event.target) && outsideTaskOptionsClick) {
            taskMenu.remove();
        }
    }
})

// Close projectMenu when you click off of it

document.addEventListener('click', (event) => {
    const outsideProjectOptionsClick = Array.from(document.querySelectorAll('.projectOptions')).every((projectOptions) => {
        return !(projectOptions.contains(event.target));
    })

    if (document.getElementById('projectMenu')) {
        if (!projectMenu.contains(event.target) && outsideProjectOptionsClick) {
            projectMenu.remove();
        }
    }
})

