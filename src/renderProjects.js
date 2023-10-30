import { getProjectFromProjectID, projectList, saveToLocalStorage } from "./creatingProject";
import { dragAndDropEvent } from "./dragAndDrop";
import { renderTaskListFromProject } from "./renderTaskList";

const createIconDiv = (name) => {
    const icon = document.createElement('div');
    icon.classList.add('material-symbols-rounded');
    icon.textContent = name;
    return icon;
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const unrenderProjectTaskList = () => {
    const mainContentTitle = document.getElementById('mainContentTitle');
    mainContentTitle.textContent = '';
    mainContentTitle.removeAttribute('projectID');
    removeAllChildNodes(document.getElementById('taskList'));
    document.getElementById('addTask').classList.add('displayNone');
    document.getElementById('addTaskForm').classList.add('displayNone');
}

// Render Project List

const renderProjectList = (projectList) => {
    removeAllChildNodes(document.getElementById('projectList'));

    projectList.forEach((project) => {
        renderProject(project);
    });

    dragAndDropEvent();
}

// Project Render Helpers

const renderProjectMenu = (projectOptionsDiv) => {
    const project = getProjectFromProjectID(projectOptionsDiv.getAttribute('projectID'));

    const projectMenu = document.createElement('div');
    projectMenu.setAttribute('id', 'projectMenu');
    projectMenu.setAttribute('projectID', project.projectID);

    const projectMenuItem1 = document.createElement('div');
    projectMenuItem1.classList.add('projectMenuItem');
    projectMenuItem1.setAttribute('id', 'deleteProject');
    projectMenuItem1.textContent = 'Delete';
    projectMenuItem1.addEventListener('click', () => {
        const mainContentTitle = document.getElementById('mainContentTitle');
        if (project.projectID === mainContentTitle.getAttribute('projectID')) {
            unrenderProjectTaskList();
        }

        projectList.splice(projectList.indexOf(project), 1);
        renderProjectList(projectList);
        projectMenu.remove();

        saveToLocalStorage();
    })

    const projectMenuItem2 = document.createElement('div');
    projectMenuItem2.classList.add('projectMenuItem');
    projectMenuItem2.setAttribute('id', 'editProject');
    projectMenuItem2.textContent = 'Edit';
    projectMenuItem2.addEventListener('click', () => {
        const editProjectForm = document.getElementById('editProjectForm');
        if (!editProjectForm) {
            renderEditProjectForm(project);
        } else if (editProjectForm.getAttribute('projectID') !== project.projectID) {
            const editProjectID = editProjectForm.getAttribute('projectID');
            
            const editProjectNameDiv = Array.from(document.querySelectorAll('.projectName')).find((projectNameDiv) => {
                return projectNameDiv.getAttribute('projectID') === editProjectID;
            });

            const editProjectOptionsDiv = Array.from(document.querySelectorAll('.projectOptions')).find((projectOptionsDiv) => {
                return projectOptionsDiv.getAttribute('projectID') === editProjectID;
            });

            editProjectNameDiv.classList.remove('displayNone');
            editProjectOptionsDiv.classList.remove('displayNone');

            editProjectForm.remove();
            renderEditProjectForm(project);
        }
        projectMenu.remove();
    })

    projectMenu.appendChild(projectMenuItem1);
    projectMenu.appendChild(projectMenuItem2);

    body.appendChild(projectMenu);
}

// Render Project

const renderProject = (project) => {
    const projectListUl = document.getElementById('projectList');

    const projectLi = document.createElement('li');
    projectLi.classList.add('prevent-select');

    const menuIconDiv = createIconDiv('menu');
    menuIconDiv.classList.add('projectMenuIcon');
    menuIconDiv.setAttribute('projectID', project.projectID);

    const projectNameDiv = document.createElement('div');
    projectNameDiv.classList.add('projectName');
    projectNameDiv.setAttribute('projectID', project.projectID);
    projectNameDiv.textContent = project.name;

    const projectOptionsDiv = createIconDiv('more_vert');
    projectOptionsDiv.classList.add('projectOptions');
    projectOptionsDiv.setAttribute('projectID', project.projectID);
    projectOptionsDiv.addEventListener('click', (event) => {
        if (document.getElementById('projectMenu')) {
            projectMenu.remove();
        }

        const {pageX: mouseX, pageY: mouseY} = event;

        renderProjectMenu(projectOptionsDiv);

        projectMenu.style.top = `${mouseY - projectMenu.offsetHeight}px`;
        projectMenu.style.left = `${mouseX}px`;
    })

    projectLi.appendChild(menuIconDiv);
    projectLi.appendChild(projectNameDiv);
    projectLi.appendChild(projectOptionsDiv);
    projectLi.classList.add('project');
    projectLi.setAttribute('projectID', project.projectID);

    projectListUl.appendChild(projectLi);

    // Project Selection

    projectNameDiv.addEventListener('click', (event) => {
        const mainContentTitle = document.getElementById('mainContentTitle');

        if (project.projectID !== mainContentTitle.getAttribute('projectID')) {
            renderTaskListFromProject(project);
        }
    })
}

// Render editProjectForm

const renderEditProjectForm = (project) => {
    const projectLi = Array.from(document.querySelectorAll('.project')).find((projectLi) => {
        return projectLi.getAttribute('projectID') === project.projectID;
    })

    const projectNameDiv = Array.from(document.querySelectorAll('.projectName')).find((projectNameDiv) => {
        return projectNameDiv.getAttribute('projectID') === project.projectID;
    });

    const projectOptionsDiv = Array.from(document.querySelectorAll('.projectOptions')).find((projectOptionsDiv) => {
        return projectOptionsDiv.getAttribute('projectID') === project.projectID;
    });

    projectNameDiv.classList.add('displayNone');
    projectOptionsDiv.classList.add('displayNone');

    const editProjectForm = document.createElement('form');
    editProjectForm.setAttribute('id', 'editProjectForm');
    editProjectForm.setAttribute('projectID', project.projectID);

    const editProjectNameInput = document.createElement('input');
    editProjectNameInput.setAttribute('type', 'text');
    editProjectNameInput.setAttribute('id', 'editProjectName');
    editProjectNameInput.setAttribute('name', 'editProjectName');
    editProjectNameInput.setAttribute('placeholder', 'Project Name');
    editProjectNameInput.setAttribute('value', project.name);

    const submitEditProjectFormBtn = document.createElement('button');
    submitEditProjectFormBtn.setAttribute('type', 'submit');
    submitEditProjectFormBtn.setAttribute('id', 'submitEditProjectForm');
    submitEditProjectFormBtn.textContent = 'Save';

    const cancelEditProjectFormBtn = document.createElement('button');
    cancelEditProjectFormBtn.setAttribute('type', 'button');
    cancelEditProjectFormBtn.setAttribute('id', 'cancelEditProjectForm');
    cancelEditProjectFormBtn.textContent = 'Cancel';
    cancelEditProjectFormBtn.addEventListener('click', () => {
        editProjectForm.remove();
        projectNameDiv.classList.remove('displayNone');
        projectOptionsDiv.classList.remove('displayNone');
    })

    editProjectForm.appendChild(editProjectNameInput);
    editProjectForm.appendChild(submitEditProjectFormBtn);
    editProjectForm.appendChild(cancelEditProjectFormBtn);

    projectLi.appendChild(editProjectForm);

    // Submit handling

    const submitEditProjectForm = () => {
        project.name = editProjectForm.elements["editProjectName"].value;
    
        editProjectForm.remove();
        projectNameDiv.classList.remove('displayNone');
        projectOptionsDiv.classList.remove('displayNone');
    
        renderProjectList(projectList);
    }

    editProjectForm.addEventListener('submit', function handleFormSubmit(event) {
        event.preventDefault();
        submitEditProjectForm();
    })
}

export { renderProjectList, unrenderProjectTaskList, createIconDiv };