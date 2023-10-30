import { v4 as uuidv4 } from "uuid";


const projectList = [];

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

    return newProject;
}

const getProjectFromProjectID = (projectID) => {
    return projectList.find((project) => {
        return project.projectID === projectID;
    })
}

export {projectList, addNewProject, getProjectFromProjectID};