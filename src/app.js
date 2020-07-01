import * as _ from 'lodash/array';
import { ProjectList } from './App/ProjectList.js';
import { ProjectItem as PrjItem } from './App/ProjectItem.js';
import { FormControl } from './App/FormControl';

class App {
  constructor() {
    this.projectsCounter = 1;
    this.form = new FormControl(this.createProject.bind(this)); // Adds form functionality
    this.init();
  }

  /*
    Create 2 lists as instantiated ProjectList classes, for:
    - Active projects
    - Finished projects

    Pass each list to the other list
    Pass each ProjectList instance's addProject function to the other instance of ProjectList
  */
  init() {
    this.activeProjectsList = new ProjectList('active');
    this.finishedProjectsList = new ProjectList('finished');
    this.activeProjectsList.setSwitchHandlerFunction(
      this.finishedProjectsList.addProject.bind(this.finishedProjectsList)
    );
    this.finishedProjectsList.setSwitchHandlerFunction(
      this.activeProjectsList.addProject.bind(this.activeProjectsList)
    );
    this.activeProjectsList.otherProjectList = this.finishedProjectsList;
    this.finishedProjectsList.otherProjectList = this.activeProjectsList;
  }

  /*
    # Create a new project

    Takes parameters:
    - title
    - description
    - tooltiptext
    - state (only for backend implementation)

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
  createProject(title, description = '', tooltipText = '', state = 'active') {
    /*
      Create DOM element
    */
    const li = document.createElement('li');
    const projectItemId = `p${this.projectsCounter}`;
    li.id = projectItemId;
    li.dataset.extraInfo = tooltipText;
    li.draggable = true;
    li.classList.add('projects__card-container');
    li.innerHTML = `
          <div class="projects__card">
            <div class="card__content">
              <h3 class="card__title">${title}</h3>
              <p class="card__description">${description}</p>
            </div>
            <div class="card__btns">
              <button class="button alt card__btns-info">Info</button>
              <button class="button card__btns-finish">${
                state === 'active' ? 'Finish' : 'Activate'
              }</button>
            </div>
          </div>`;

    // Decide which list the element is added to
    const currentList =
      state === 'active' ? this.activeProjectsList : this.finishedProjectsList;

    // Append list item to either active or finished list
    document
      .querySelector(`#${state}-projects .projects__list`)
      .appendChild(li);

    // Instantiated ProjectItem class based on project properties
    currentList.projects.push(
      new PrjItem(
        projectItemId,
        currentList.switchProject.bind(currentList),
        state
      )
    );
    // Increment project id
    this.projectsCounter++;
  }
}

// Initialise app
const app = new App();

// Add 2 dummy projects
app.createProject(
  'Deliver the new placefinder Web app',
  'Our client needs this done ASAP',
  "Don't forget to discuss the new proposition with John",
  'active'
);
app.createProject(
  'Build a portfolio',
  'Improve brand recognition',
  'Incorporate A/B testing',
  'finished'
);
