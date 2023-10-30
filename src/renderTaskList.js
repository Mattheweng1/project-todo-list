import { isThisWeek, isToday } from "date-fns";
import { projectList } from "./creatingProject";
import { unrenderProjectTaskList } from "./renderProjects";
import { renderTask } from "./renderTask";
import { convertTaskDueDate, sortTaskList } from "./creatingTask";

const getAllTasks = () => {
  const allTasks = [];
  projectList.forEach((project) => {
    project.taskList.forEach((task) => {
      allTasks.push(task);
    })
  });
  return allTasks;
}

// Home Section

const renderAllTaskList = () => {
  unrenderProjectTaskList();

  const mainContentTitle = document.getElementById('mainContentTitle');
  mainContentTitle.textContent = 'All Tasks';

  const allTasks = getAllTasks();

  sortTaskList(allTasks).forEach((task) => {
    renderTask(task);
  })
}

const renderTodayTaskList = () => {
  unrenderProjectTaskList();

  const mainContentTitle = document.getElementById('mainContentTitle');
  mainContentTitle.textContent = 'Today';

  const allTasks = getAllTasks();

  const todayTasks = allTasks.filter((task) => {
    return isToday(convertTaskDueDate(task.dueDate));
  })

  sortTaskList(todayTasks).forEach((task) => {
    renderTask(task);
  })
}

const renderThisWeekTaskList = () => {
  unrenderProjectTaskList();

  const mainContentTitle = document.getElementById('mainContentTitle');
  mainContentTitle.textContent = 'This Week';

  const allTasks = getAllTasks();

  const thisWeekTasks = allTasks.filter((task) => {
    return isThisWeek(convertTaskDueDate(task.dueDate));
  })

  sortTaskList(thisWeekTasks).forEach((task) => {
    renderTask(task);
  })
}

const renderBookmarkedTaskList = () => {
  unrenderProjectTaskList();

  const mainContentTitle = document.getElementById('mainContentTitle');
  mainContentTitle.textContent = 'Bookmarked';

  const allTasks = getAllTasks();

  const bookmarkedTasks = allTasks.filter((task) => {
    return task.bookmarked;
  })

  sortTaskList(bookmarkedTasks).forEach((task) => {
    renderTask(task);
  })
}

// Projects Section

const renderTaskListFromProject = (project) => {
    unrenderProjectTaskList();

    const mainContentTitle = document.getElementById('mainContentTitle');
    mainContentTitle.setAttribute('projectID', project.projectID);
    mainContentTitle.textContent = project.name;

    const addTaskBtn = document.getElementById('addTask');
    const addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.reset();
    addTaskBtn.classList.remove('displayNone');
    addTaskForm.classList.add('displayNone');

    sortTaskList(project.taskList).forEach((task) => {
        renderTask(task);
    });
}

export { renderAllTaskList, renderTodayTaskList, renderThisWeekTaskList, renderBookmarkedTaskList, renderTaskListFromProject, convertTaskDueDate };