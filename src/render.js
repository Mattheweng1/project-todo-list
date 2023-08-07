

const createIconDiv = (name) => {
    const icon = document.createElement('div');
    icon.classList.add('material-symbols-rounded');
    icon.textContent = name;
    return icon;
}

const renderProject = (project) => {
    const projectListUl = document.querySelector('.projectList');

    const projectLi = document.createElement('li');

    const menuIconDiv = createIconDiv('menu');

    const projectNameDiv = document.createElement('div');
    projectNameDiv.textContent = project.name;

    const optionsIconDiv = createIconDiv('more_vert');

    projectLi.appendChild(menuIconDiv);
    projectLi.appendChild(projectNameDiv);
    projectLi.appendChild(optionsIconDiv);

    projectListUl.appendChild(projectLi);
}

const renderProjectList = (projectList) => {
    projectList.forEach((project) => {
        renderProject(project);
    });
}

const renderTask = (task) => {
    const taskListUl = document.querySelector('.taskList');

    const taskLi = document.createElement('li');

    const checkBoxDiv = createIconDiv('checkbox');

    const taskNameDiv = document.createElement('div');
    taskNameDiv.textContent = task.taskName;

    const priorityDiv = document.createElement('div');
    priorityDiv.textContent = 'Priority - ';

    const dueDateDiv = document.createElement('div');
    dueDateDiv.textContent = task.dueDate;

    const bookmarkDiv = createIconDiv('bookmark');

    const detailsToggleDiv = document.createElement('div');
    detailsToggleDiv.classList.add('detailsToggle');
    detailsToggleDiv.addEventListener('click', () => {
        detailsDiv.classList.toggle('hidden');
        if (detailsToggleIconDiv.textContent === 'keyboard_double_arrow_right') {
            detailsToggleIconDiv.textContent = 'keyboard_double_arrow_left';
        } else if (detailsToggleIconDiv.textContent === 'keyboard_double_arrow_left') {
            detailsToggleIconDiv.textContent = 'keyboard_double_arrow_right';
        }
    });

    const detailsToggleTextDiv = document.createElement('div');
    detailsToggleTextDiv.textContent = 'Details';

    const detailsToggleIconDiv = createIconDiv('keyboard_double_arrow_right')

    detailsToggleDiv.appendChild(detailsToggleTextDiv);
    detailsToggleDiv.appendChild(detailsToggleIconDiv);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('hidden');
    detailsDiv.classList.add('details');
    detailsDiv.textContent = task.details;

    taskLi.appendChild(checkBoxDiv);
    taskLi.appendChild(taskNameDiv);
    taskLi.appendChild(priorityDiv);
    taskLi.appendChild(dueDateDiv);
    taskLi.appendChild(bookmarkDiv);
    taskLi.appendChild(detailsToggleDiv);
    taskLi.appendChild(detailsDiv);

    taskListUl.appendChild(taskLi);
}

const renderTaskListFromProject = (project) => {
    project.taskList.forEach((task) => {
        renderTask(task);
    });
}

export {renderProjectList, renderTaskListFromProject};