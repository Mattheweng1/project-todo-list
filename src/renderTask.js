import { format } from "date-fns";
import { convertTaskDueDate, getProjectFromTaskID, getTaskFromTaskID } from "./creatingTask";
import { createIconDiv } from "./renderProjects";
import { renderBookmarkedTaskList, renderTaskListFromProject } from "./renderTaskList";
import { saveToLocalStorage } from "./creatingProject";

const formatTaskDueDate = (taskDueDate) => {
    const dateArr = taskDueDate.split('-');
    return format(new Date(dateArr[0], dateArr[1]-1, dateArr[2]), 'P');
}

// Task Render Helpers

const renderTaskPriority = (taskLi, priorityDiv) => {
    const task = getTaskFromTaskID(taskLi.getAttribute('taskID'));

    taskLi.classList.remove('yellowPrio');
    taskLi.classList.remove('orangePrio');
    taskLi.classList.remove('redPrio');
    taskLi.classList.remove('noPrio');

    if (task.priority === '1') {
        priorityDiv.textContent = 'Priority - !';
        taskLi.classList.add('yellowPrio');
    } else if (task.priority === '2') {
        priorityDiv.textContent = 'Priority - !!';
        taskLi.classList.add('orangePrio');
    } else if (task.priority === '3') {
        priorityDiv.textContent = 'Priority - !!!';
        taskLi.classList.add('redPrio');
    } else {
        priorityDiv.textContent = 'Priority - X';
        taskLi.classList.add('noPrio');
    }
}

const renderTaskBookmark = (taskLi, bookmarkDiv) => {
    const task = getTaskFromTaskID(taskLi.getAttribute('taskID'));

    if (task.bookmarked) {
        bookmarkDiv.classList.add('filledIcon');
    } else {
        bookmarkDiv.classList.remove('filledIcon');
    }
}

const renderTaskCompletion = (taskLi, checkboxDiv) => {
    const task = getTaskFromTaskID(taskLi.getAttribute('taskID'));

    if (task.completed) {
        checkboxDiv.classList.add('completed');
        taskLi.classList.add('completed');
    } else {
        checkboxDiv.classList.remove('completed');
        taskLi.classList.remove('completed');
    }
}

const renderTaskMenu = (taskOptionsDiv) => {
    const task = getTaskFromTaskID(taskOptionsDiv.getAttribute('taskID'));

    const taskMenu = document.createElement('div');
    taskMenu.setAttribute('id', 'taskMenu');
    taskMenu.setAttribute('taskID', task.taskID);

    const project = getProjectFromTaskID(task.taskID);

    const taskMenuItem1 = document.createElement('div');
    taskMenuItem1.classList.add('taskMenuItem');
    taskMenuItem1.setAttribute('id', 'deleteTask');
    taskMenuItem1.textContent = 'Delete';
    taskMenuItem1.addEventListener('click', () => {
        project.taskList.splice(project.taskList.indexOf(task), 1);
        renderTaskListFromProject(project);
        taskMenu.remove();

        saveToLocalStorage();
    })

    const taskMenuItem2 = document.createElement('div');
    taskMenuItem2.classList.add('taskMenuItem');
    taskMenuItem2.setAttribute('id', 'editTask');
    taskMenuItem2.textContent = 'Edit';
    taskMenuItem2.addEventListener('click', () => {
        const editTaskForm = document.getElementById('editTaskForm');
        if (!editTaskForm) {
            renderEditTaskForm(task);
        } else if (editTaskForm.getAttribute('taskID') !== task.taskID) {
            editTaskForm.remove();
            renderEditTaskForm(task);
        }
        taskMenu.remove();
    })

    taskMenu.appendChild(taskMenuItem1);
    taskMenu.appendChild(taskMenuItem2);

    body.appendChild(taskMenu);
}

// Render Task

const renderTask = (task) => {
    const taskListUl = document.getElementById('taskList');

    const taskLi = document.createElement('li');
    taskLi.classList.add('task');
    taskLi.classList.add('prevent-select');
    taskLi.setAttribute('taskID', task.taskID);

    const checkboxDiv = document.createElement('div');
    checkboxDiv.classList.add('taskCompletion');
    checkboxDiv.innerHTML = `<svg class="c-form__radio-icon" viewbox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <circle class="c-form__radio-circle" cx="10.809" cy="10.809" r="9.461"/>
        <polyline class="c-form__radio-tick" points="5 8 10 15 25 0"/>
    </svg>`;
    renderTaskCompletion(taskLi, checkboxDiv);
    checkboxDiv.addEventListener('click', () => {
        if (task.completed) {
            task.completed = false;
        } else {
            task.completed = true;
        }

        renderTaskCompletion(taskLi, checkboxDiv);

        saveToLocalStorage();
    })

    const taskNameDiv = document.createElement('div');
    taskNameDiv.classList.add('taskName');
    taskNameDiv.textContent = task.taskName;

    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('priority');
    renderTaskPriority(taskLi, priorityDiv);
    priorityDiv.addEventListener('click', () => {
        if (task.priority === '1') {
            task.priority = '2';
        } else if (task.priority === '2') {
            task.priority = '3';
        } else if (task.priority === '3') {
            task.priority = '0';
        } else {
            task.priority = '1';
        }

        renderTaskPriority(taskLi, priorityDiv);

        saveToLocalStorage();
    })

    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add('dueDate');
    dueDateDiv.textContent = formatTaskDueDate(task.dueDate);
    if ((convertTaskDueDate(task.dueDate) - new Date().setHours(0,0,0,0)) < 0) {
        taskLi.classList.add('overdue');
    } else {
        taskLi.classList.remove('overdue');
    }

    const bookmarkDiv = createIconDiv('bookmark');
    bookmarkDiv.classList.add('bookmark');
    renderTaskBookmark(taskLi, bookmarkDiv);
    bookmarkDiv.addEventListener('click', () => {
        if (task.bookmarked) {
            task.bookmarked = false;

            const mainContentTitle = document.getElementById('mainContentTitle');
            if (mainContentTitle.textContent === 'Bookmarked') {
                renderBookmarkedTaskList();
            }
        } else {
            task.bookmarked = true;
        }

        renderTaskBookmark(taskLi, bookmarkDiv);

        saveToLocalStorage();
    })

    const taskOptionsDiv = createIconDiv('more_vert');
    taskOptionsDiv.classList.add('taskOptions');
    taskOptionsDiv.setAttribute('taskID', task.taskID);
    taskOptionsDiv.addEventListener('click', (event) => {
        if (document.getElementById('taskMenu')) {
            taskMenu.remove();
        }

        const {pageX: mouseX, pageY: mouseY} = event;

        renderTaskMenu(taskOptionsDiv);

        taskMenu.style.top = `${mouseY - taskMenu.offsetHeight}px`;
        taskMenu.style.right = `${body.offsetWidth - mouseX}px`;
    })

    const detailsToggleDiv = document.createElement('div');
    detailsToggleDiv.classList.add('detailsToggle');
    detailsToggleDiv.addEventListener('click', () => {
        detailsDiv.classList.toggle('noWrap');
        if (detailsToggleIconDiv.textContent === 'keyboard_double_arrow_down') {
            detailsToggleIconDiv.textContent = 'keyboard_double_arrow_up';
        } else if (detailsToggleIconDiv.textContent === 'keyboard_double_arrow_up') {
            detailsToggleIconDiv.textContent = 'keyboard_double_arrow_down';
        }
    });

    const detailsToggleTextDiv = document.createElement('div');
    detailsToggleTextDiv.textContent = 'Details';

    const detailsToggleIconDiv = createIconDiv('keyboard_double_arrow_down')

    detailsToggleDiv.appendChild(detailsToggleTextDiv);
    detailsToggleDiv.appendChild(detailsToggleIconDiv);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('noWrap');
    detailsDiv.classList.add('details');
    detailsDiv.textContent = task.details;

    taskLi.appendChild(checkboxDiv);
    taskLi.appendChild(taskNameDiv);
    taskLi.appendChild(priorityDiv);
    taskLi.appendChild(dueDateDiv);
    taskLi.appendChild(bookmarkDiv);
    taskLi.appendChild(taskOptionsDiv);
    taskLi.appendChild(detailsToggleDiv);
    taskLi.appendChild(detailsDiv);

    taskListUl.appendChild(taskLi);
}

// Render editTaskForm

const renderEditTaskForm = (task) => {
    const taskLi = Array.from(document.querySelectorAll('.task')).find((taskLi) => {
        return taskLi.getAttribute('taskID') === task.taskID;
    })

    const editTaskForm = document.createElement('form');
    editTaskForm.setAttribute('id', 'editTaskForm');
    editTaskForm.setAttribute('taskID', task.taskID);

    // Edit Task Name

    const taskNameLabel = document.createElement('label');
    taskNameLabel.setAttribute('for', 'editTaskName');

    const taskNameDiv = document.createElement('div');
    taskNameDiv.textContent = 'Task Name';

    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('id', 'editTaskName');
    taskNameInput.setAttribute('name', 'editTaskName');
    taskNameInput.setAttribute('placeholder', task.taskName);
    taskNameInput.setAttribute('value', task.taskName);
    taskNameInput.setAttribute('required', '');

    taskNameLabel.appendChild(taskNameDiv);
    taskNameLabel.appendChild(taskNameInput);

    // Edit Task Details

    const taskDetailsLabel = document.createElement('label');
    taskDetailsLabel.setAttribute('for', 'editTaskDetails');

    const taskDetailsDiv = document.createElement('div');
    taskDetailsDiv.textContent = 'Details (optional)';

    const taskDetailsTextarea = document.createElement('textarea');
    taskDetailsTextarea.setAttribute('id', 'editTaskDetails');
    taskDetailsTextarea.setAttribute('name', 'editTaskDetails');
    taskDetailsTextarea.setAttribute('cols', '30');
    taskDetailsTextarea.setAttribute('rows', '3');
    taskDetailsTextarea.setAttribute('maxlength', '240');
    taskDetailsTextarea.setAttribute('placeholder', task.details);
    taskDetailsTextarea.textContent = task.details;

    taskDetailsLabel.appendChild(taskDetailsDiv);
    taskDetailsLabel.appendChild(taskDetailsTextarea);

    // Edit Task Due Date

    const taskDueDateLabel = document.createElement('label');
    taskDueDateLabel.setAttribute('for', 'editTaskDueDate');

    const taskDueDateDiv = document.createElement('div');
    taskDueDateDiv.textContent = 'Due Date';

    const taskDueDateInput = document.createElement('input');
    taskDueDateInput.setAttribute('type', 'date');
    taskDueDateInput.setAttribute('id', 'editTaskDueDate');
    taskDueDateInput.setAttribute('name', 'editTaskDueDate');
    taskDueDateInput.setAttribute('required', '');
    taskDueDateInput.setAttribute('value', task.dueDate);

    taskDueDateLabel.appendChild(taskDueDateDiv);
    taskDueDateLabel.appendChild(taskDueDateInput);

    // Edit Task Form Buttons

    const taskFormBtnsDiv = document.createElement('div');
    taskFormBtnsDiv.setAttribute('id', 'editTaskFormBtns');

    const submitEditTaskFormBtn = document.createElement('button');
    submitEditTaskFormBtn.setAttribute('type', 'submit');
    submitEditTaskFormBtn.setAttribute('id', 'submitEditTaskForm');
    submitEditTaskFormBtn.textContent = 'Save Changes';

    const cancelEditTaskFormBtn = document.createElement('button');
    cancelEditTaskFormBtn.setAttribute('type', 'button');
    cancelEditTaskFormBtn.setAttribute('id', 'cancelEditTaskForm');
    cancelEditTaskFormBtn.textContent = 'Cancel';
    cancelEditTaskFormBtn.addEventListener('click', () => {
        editTaskForm.remove();
    })

    taskFormBtnsDiv.appendChild(submitEditTaskFormBtn);
    taskFormBtnsDiv.appendChild(cancelEditTaskFormBtn);

    // Append children for editTaskForm

    editTaskForm.appendChild(taskNameLabel);
    editTaskForm.appendChild(taskDetailsLabel);
    editTaskForm.appendChild(taskDueDateLabel);
    editTaskForm.appendChild(taskFormBtnsDiv);

    taskLi.appendChild(editTaskForm);

    // Submit handling

    const submitEditTaskForm = () => {
        task.taskName = editTaskForm.elements["editTaskName"].value;
        task.details = editTaskForm.elements["editTaskDetails"].value;
        task.dueDate = editTaskForm.elements["editTaskDueDate"].value;
    
        editTaskForm.remove();
    
        renderTaskListFromProject(getProjectFromTaskID(task.taskID));

        saveToLocalStorage();
    }

    editTaskForm.addEventListener('submit', function handleFormSubmit(event) {
        event.preventDefault();
        submitEditTaskForm();
    })
}

export { renderTask };