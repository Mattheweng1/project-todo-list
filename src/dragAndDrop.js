import { sortProjectList } from "./creatingProject";

const container = document.getElementById('projectList');

// Add all event listeners for drag and drop
const dragAndDropEvent = () => {
  const draggables = document.querySelectorAll('.project');

  enableDraggableEvent();

  draggables.forEach((draggable) => {
    dragStartEndEvent(draggable);
  })

  container.addEventListener('dragover', dragOver);
}

// Only draggable from menuIcon
const enableDraggableEvent = () => {
  const menuIcons = document.querySelectorAll('.projectMenuIcon');

  menuIcons.forEach((menuIcon) => {
    menuIcon.addEventListener('mousedown', (e) => {
      e.target.parentNode.draggable = true;
    })
    menuIcon.addEventListener('mouseleave', (e) => {
      e.target.parentNode.draggable = false;
    })
  })
}

const dragStartEndEvent = (draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
    container.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    container.classList.remove('dragging');

    sortProjectList();
  });
};

const dragOver = (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  const dragging = document.querySelector('.project.dragging');
  if (afterElement == null) {
    container.appendChild(dragging);
  } else {
    container.insertBefore(dragging, afterElement);
  }
};

const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.project:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height/2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    };
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export { dragAndDropEvent };