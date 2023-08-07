import { projectList, CreateProject, addProjectToList } from "./creatingProject";
import { CreateTask, addTaskToProject } from "./creatingTask";
import { renderProjectList, renderTaskListFromProject } from "./render";


const exampleProj = CreateProject('work stuff');
const exampleProj2 = CreateProject('chores');

addProjectToList(exampleProj);
addProjectToList(exampleProj2);

const exampleTask = CreateTask('work stuff', 'Code project', 'more than just some details', true, 1, true, new Date());

addTaskToProject(exampleTask);
console.log(projectList);

renderProjectList(projectList);

renderTaskListFromProject(projectList[0]);




// Add event listeners to menuToggle

const menuToggle = document.querySelector('.menuToggle');
menuToggle.addEventListener('click', () => {
    const mainMenu = document.querySelector('.mainMenu');
    mainMenu.classList.toggle('hideMenu');
});
menuToggle.addEventListener('click', () => {
    const mainContent = document.querySelector('.mainContent');
    mainContent.classList.toggle('noMargin');
})