import { projectList, addNewProject } from "./creatingProject";
import { addNewTask, getProjectFromTaskID } from "./creatingTask";
import { validateProjectName } from "./customValidation";
import { renderProjectList } from "./renderProjects";
import { renderAllTaskList, renderBookmarkedTaskList, renderThisWeekTaskList, renderTodayTaskList, renderTaskListFromProject } from "./renderTaskList";

if (projectList.length === 0) {
    addNewProject('Example Project');
    addNewTask('Example Project', 'Example Task', `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`, false, '1', false, '1111-11-11');
}

renderProjectList(projectList);
renderAllTaskList();

// Helper function

const getRadioValue = (name) => {
    const radios = document.getElementsByName(name);

    for (let i=0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

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

// addProjectForm Validation

const addProjectNameInput = document.getElementById('addProjectName');

addProjectNameInput.addEventListener('input', function handleInput() {
    validateProjectName(addProjectNameInput);
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

// Render allTasks event

const allTasksDiv = document.getElementById('allTasks');
allTasksDiv.addEventListener('click', renderAllTaskList);

// Render todayTasks event

const todayTasksDiv = document.getElementById('todayTasks');
todayTasksDiv.addEventListener('click', renderTodayTaskList);

// Render thisWeekTasks event

const thisWeekTasksDiv = document.getElementById('thisWeekTasks');
thisWeekTasksDiv.addEventListener('click', renderThisWeekTaskList);

// Render bookmarkedTasks event

const bookmarkedTasksDiv = document.getElementById('bookmarkedTasks');
bookmarkedTasksDiv.addEventListener('click', renderBookmarkedTaskList);