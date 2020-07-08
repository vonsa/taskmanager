import { DOMHelper } from '../Utility/DOMHelper';
import Component from './Component.js';

export class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  /*


    Full creation process for the tooltip

    
  */

  create() {
    // Display the overlay
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('visible');

    this.renderTooltip(); // Prepares the tooltip so it can be appended @ this.attach()
    this.addEventListeners(overlay); // Adds event listeners for closing the tooltip
    this.attach(); // Appends the tooltip in the DOM

    this.card = this.element.closest('.projects__card');

    this.addAnimationClasses(); // Add classes to show the tooltip and initialize CSS animations
  }

  /*


    Add classes to show the tooltip and initialize CSS animations

    
  */

  addAnimationClasses() {
    this.card.classList.remove('tooltip-end');
    this.card.classList.add('tooltip-showing');
  }

  /*


    Remove classes to remove the tooltip and initialize CSS animations

    
  */

  removeAnimationClasses() {
    this.card.classList.remove('tooltip-showing');
    this.card.classList.add('tooltip-end');
    setTimeout((e) => {
      this.card.classList.remove('tooltip-end');
    }, 200);
  }

  /*


    Prepare node for DOM appendage

    
  */

  renderTooltip() {
    // Create tooltip element
    this.element = document.createElement('div');
    this.element.className = 'card__tooltip';

    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    this.element.append(tooltipBody);
  }

  /*


    Add event listeners to close the tooltip


  */

  addEventListeners(overlay) {
    // Removes tooltip on click
    this.element.addEventListener(
      'click',
      this.closeTooltip.bind(this, overlay)
    );
    overlay.addEventListener('click', this.closeTooltip.bind(this, overlay));
  }

  /*


    Close tooltip & overlay and remove overlay's event listener


  */

  closeTooltip(overlay) {
    overlay.classList.remove('visible');
    DOMHelper.clearEventListeners(overlay);
    this.removeAnimationClasses();
    this.detach();
    this.closeNotifier();
  }
}
