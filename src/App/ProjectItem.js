import { DOMHelper } from '../Utility/DOMHelper.js';

/* 
  Every project is created as an instance of the ProjectItem class
*/

export class ProjectItem {
  // updateProjectListsFunction parameter references to either the active or finished ProjectList instance. That allows the list to add itself to the other list.
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.element = document.getElementById(id);
    this.hasActiveTooltip = false;
    this.updateProjectListsHandler = updateProjectListsFunction; // Executed when either the Activate of Finish button is pressed
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  // Display the tooltip
  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    // Create a new tooltip
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
      // Create a new tooltip
      this.tooltip.attach();
      this.hasActiveTooltip = 'true';
    });
  }

  // Add data to the drag event, which can be extracted on the drop event
  connectDrag() {
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
  }

  // Add event listener to the more info button to show the tooltip
  connectMoreInfoButton() {
    const moreInfoBtn = this.element.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  /*
    Set or change the switch button
    On click, switch button will transfer the project to the other list
  */
  connectSwitchButton(type) {
    let switchBtn = this.element.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  // Called by the addProject function of the ProjectList instance, to switch around the switch handling functions
  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}
