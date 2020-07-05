import { ProjectItem as PrjItem } from './ProjectItem.js';
import { DOMHelper as DOMH } from '../Utility/DOMHelper.js';

export class ProjectList {
  constructor(type) {
    /*
      A total of 2 project lists are created, types are:
      - active
      - finished
    */
    this.type = type;
    this.projects = [];
    this.connectDroppable();
    this.thisListResultMessage = document.querySelector(
      `#${type}-projects .projects__results-message`
    );
  }

  connectDroppable() {
    // Select active or finished DOM project list
    const list = document.querySelector(`#${this.type}-projects ul`);

    /*
      Temporarily stores currently dragged element in both instantiated ProjectList classes (until drag ends)
      Adds CSS classes for styling/animation purposes
    */
    list.addEventListener('dragstart', (event) => {
      this.lastDraggedElement = event.target;
      this.otherProjectList.lastDraggedElement = event.target;

      event.target.classList.add('current-drag');
      event.target.classList.remove('drag-out');
    });

    /*
      Adds CSS class to a droppable area for visual confirmation
    */
    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.classList.add('droppable');
        event.preventDefault();
      }
    });

    /*
      To allow a drop inside of another element, default behavior should be cancelled for dragover
    */
    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    /*
      Removes CSS class from a droppable area when the mouse leaves an element's surface
    */
    list.addEventListener('dragleave', (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.classList.remove('droppable');
      }
    });

    /*
      Add and remove CSS classes to play drop animation
    */
    list.addEventListener('dragend', (event) => {
      this.lastDraggedElement.classList.remove('current-drag');
      this.lastDraggedElement.classList.add('drag-out');
      setTimeout((e) => {
        this.lastDraggedElement.classList.remove('drag-out');
      }, 250);
    });

    /*
      Triggers a click on the 'Activate' or 'Finish' button
      Executes the switchProject function
    */
    list.addEventListener('drop', (event) => {
      event.target.closest(`ul`).classList.remove('droppable');

      // return if project is dropped in the same list
      if (this.projects.find((p) => p.id === this.lastDraggedElement.id)) {
        return;
      }

      // Trigger a click on the activate or finish button to initiate the switch to the other list
      document
        .getElementById(this.lastDraggedElement.id)
        .querySelector('button:last-of-type')
        .click();
    });
  }

  // Set by App instance
  // the addProject function of the other ProjectList instance is defined as switchHandlerFunction
  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  // This function is passed to the other instance of ProjectList
  // Not targeted directly inside of ProjectList, but the copied reference is targeted as switchHandler
  addProject(project) {
    this.thisListResultMessage.classList.remove('active');

    this.projects.push(project);
    DOMH.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  // Passed to instances of ProjectItem
  // Executed when either an Active or Finished button is pressed
  // this.switchHandler = addProject function of the other list
  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);

    if (this.projects.length === 0) {
      this.thisListResultMessage.classList.add('active');
    }
  }
}
