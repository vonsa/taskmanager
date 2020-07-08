export default class {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  /*


    Remove tooltip and associated CSS classes

    
  */

  detach() {
    if (this.element) {
      this.element.remove();
    }
  }

  /*


    Create a new tooltip

    
  */

  attach() {
    this.hostElement
      .querySelector('.projects__card')
      .insertAdjacentElement(
        this.insertBefore ? 'afterbegin' : 'beforeend',
        this.element
      );
  }
}
