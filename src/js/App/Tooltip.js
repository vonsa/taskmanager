import { DOMHelper } from '../Utility/DOMHelper';
import Cmp, { doSomething } from './Component.js';

export class Tooltip extends Cmp {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  create() {
    // Select DOM elements
    const overlay = document.querySelector('.overlay');
    const tooltipTemplate = document.getElementById('tooltip');
    // Create tooltip element
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card__tooltip';
    // Display the overlay
    overlay.classList.add('visible');

    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    // Removes tooltip on click
    tooltipElement.addEventListener(
      'click',
      this.closeTooltip.bind(this, overlay)
    );
    overlay.addEventListener('click', this.closeTooltip.bind(this, overlay));
    this.element = tooltipElement;
  }

  // Close tooltip & overlay and remove overlay's event listener
  closeTooltip(overlay) {
    overlay.classList.remove('visible');
    DOMHelper.clearEventListeners(overlay);
    this.detach();
    this.closeNotifier();
  }
}
