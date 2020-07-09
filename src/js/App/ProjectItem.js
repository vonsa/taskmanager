import { DOMHelper } from '../Utility/DOMHelper.js';

/* 
  Every project is created as an instance of the ProjectItem class
*/

export class ProjectItem {
  // updateProjectListsFunction parameter references to either the active or finished ProjectList instance. That allows the list to add itself to the other list.
  constructor(projectInfo, projectItemId, updateProjectListsFunction) {
    this.id = projectItemId;
    this.element = this.renderElement(projectInfo, projectItemId);
    this.hasActiveTooltip = false;
    this.updateProjectListsHandler = updateProjectListsFunction; // Executed when either the Activate of Finish button is pressed
    this.connectMoreInfoButton();
    this.connectSwitchButton(projectInfo.state);
    this.connectDrag();
  }

  /*


    Create project list HTML element

    
  */

  renderElement(projectInfo, projectItemId) {
    const li = document.createElement('li');
    li.dataset.extraInfo = projectInfo.tooltipText || '';
    li.id = projectItemId;
    li.draggable = true;
    li.classList.add('projects__card-container');
    li.innerHTML = `
          <div class="projects__card">
            <div class="card__content">
              <h3 class="card__title">${projectInfo.title || ''}</h3>
              <p class="card__description">${projectInfo.description || ''}</p>
            </div>
            <div class="card__btns">
              <button class="button alt card__btns-info">Info</button>
              <button class="button card__btns-finish">${
                projectInfo.state === 'finished' ? 'Activate' : 'Finish'
              }</button>
            </div>
          </div>`;
    return li;
  }

  /*


    Display the tooltip

    
  */

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltipText = this.element.dataset.extraInfo;

    // Import Tooltip class & instantiate
    import('./Tooltip.js').then((module) => {
      this.tooltip = new module.Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      );

      this.hasActiveTooltip = 'true';
    });
  }

  /*


    Add data to the drag event, which can be extracted on the drop event

    
  */

  connectDrag() {
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
  }

  /*


    Add event listener to the more info button to show the tooltip

    
  */

  connectMoreInfoButton() {
    const moreInfoBtn = this.element.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  /*


    Set or change the project list item's switch (Activate or Finish) button
    On click, switch button will transfer the project to the other list

    
  */

  connectSwitchButton(type) {
    let switchBtn = this.element.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'finished' ? 'Activate' : 'Finish';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  /*


    The update funcction is called by the addProject function of a ProjectList instance.
    Updates the list item's switch button functionality.

    
  */

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn; // The updateProjectListsHandler function is redefined as the switch function from the opposing ProjectList instance.
    this.connectSwitchButton(type);
  }
}
