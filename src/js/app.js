import { ProjectList } from './App/ProjectList.js';
import { ProjectItem as PrjItem } from './App/ProjectItem.js';
import { FormControl } from './App/FormControl';

export class App {
  constructor() {
    this.projectsCounter = 1;
    this.form = new FormControl(this.createProject.bind(this)); // Adds form functionality
    this.createProjectLists();
  }

  /*
    Create 2 lists as instantiated ProjectList classes, for:
    - Active projects
    - Finished projects

    Pass each list to the other list
    Pass each ProjectList instance's addProject function to the other instance of ProjectList
  */
  createProjectLists() {
    this.activeProjectsList = new ProjectList('active');
    this.finishedProjectsList = new ProjectList('finished');

    // Add each instance of ProjectList to the other instance of ProjectList
    this.activeProjectsList.otherProjectList = this.finishedProjectsList;
    this.finishedProjectsList.otherProjectList = this.activeProjectsList;
  }

  /*
    # Create a new project

    Takes parameters:
    - title
    - description
    - tooltiptext
    - state (not currently used, prepared for backend database implementation)

    ## DOM ##
    Creates the HTML list element and appends it to either of the following:
    - Active projects list
    - Finished projects list

    ## Internal ##
    - Sets an id for the element
    - Creates an instantiated ProjectItem class based on the project
    - Pushes the class to either the instantiated active or finished ProjectList class.

    ## Backend implementation ##
    state is used as an optional parameter to place the element in either the active or finished list

  */
  createProject(projectInfo) {
    const state = projectInfo.state === 'finished' ? 'finished' : 'active';

    // Decide which instantiated ProjectList class the following projectElement is added to
    const currentList =
      projectInfo.state === 'finished'
        ? this.finishedProjectsList
        : this.activeProjectsList;

    // Add a project id based on a top level counter mechanism
    const projectItemId = `p${this.projectsCounter}`;

    // Instantiate ProjectItem class based on project properties and push it to the corresponding ProjectList instance
    const project = new PrjItem(
      projectInfo,
      projectItemId,
      currentList.switchProject.bind(currentList)
    );
    currentList.projects.push(project);

    // Remove 'list empty' indicator
    currentList.thisListResultMessage.classList.remove('active');

    // Append list item to either active or finished list
    document
      .querySelector(`#${state}-projects .projects__list`)
      .appendChild(project.element);

    // Increment project id
    this.projectsCounter++;
  }
}
