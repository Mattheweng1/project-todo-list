import { projectList } from "./creatingProject";

const validateProjectName = (projectNameInput) => {
  const matchesHomeSection = [...document.querySelectorAll('.home>div>.homeSectionName')].some((homeSectionName) => {
      return homeSectionName.textContent === projectNameInput.value;
  })

  const matchesProjectName = projectList.some((project) => {
      return project.name === projectNameInput.value;
  })

  if (matchesHomeSection || matchesProjectName) {
      projectNameInput.setCustomValidity('Project name must be unique.');
  } else {
      projectNameInput.setCustomValidity('');
  }
}

export { validateProjectName };