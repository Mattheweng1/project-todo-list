

const projectList = [];

const CreateProject = (name) => {
    const taskList = [];
    return {
        name,
        taskList
    }
};

const addProjectToList = (project) => {
    projectList.push(project);
}

export {projectList, CreateProject, addProjectToList};