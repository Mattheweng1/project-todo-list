import { v4 as uuidv4 } from "uuid";

const projectList = JSON.parse(localStorage.getItem('projectList')) || [];

const saveToLocalStorage = () => {
    localStorage.setItem('projectList', JSON.stringify(projectList));
}

const sortProjectList = () => {
    const projectLiArr = [...document.querySelectorAll('.project')];
    projectLiArr.forEach((projectLi) => {
        const project = getProjectFromProjectID(projectLi.getAttribute('projectID'));
        const projectIndex = projectLiArr.indexOf(projectLi);
        project.sortIndex = projectIndex;
    })
    projectList.sort((projectA, projectB) => {
        return projectA.sortIndex - projectB.sortIndex;
    })

    saveToLocalStorage();
}

const CreateProject = (name) => {
    const taskList = [];
    const projectID = uuidv4();
    return {
        name,
        taskList,
        projectID
    }
};

const addProjectToList = (project) => {
    projectList.push(project);
}

const addNewProject = (name) => {
    const newProject = CreateProject(name);
    addProjectToList(newProject);

    saveToLocalStorage();

    return newProject;
}

const getProjectFromProjectID = (projectID) => {
    return projectList.find((project) => {
        return project.projectID === projectID;
    })
}

export { projectList, saveToLocalStorage, addNewProject, getProjectFromProjectID, sortProjectList };