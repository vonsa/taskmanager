/*
  Handles anything related to the Create Project Form
*/

import { DOMHelper } from '../Utility/DOMHelper';

export class FormControl {
  constructor(callBackFunction) {
    this.retrieveFormElements();
    /*
      Callback function is createProject passed by App
      Will execute the createProject function to generate a new project (in DOM + internally) passing in the following data retrieved by the form:
      - title
      - description
      - tooltip info
    */
    this.addEventListeners(callBackFunction);
  }

  /*


    Retrieve DOM form elements + overlay

    
  */

  retrieveFormElements() {
    this.formContainer = document.querySelector('.form__container');
    this.form = document.getElementById('form');
    this.inputs = document.querySelectorAll('.form input');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    this.tooltip = document.getElementById('notes');
    this.popupBtn = document.getElementById('form-popup-btn');
    this.overlay = document.querySelector('.overlay');
  }

  /*


    Will add supplied message as innerText to the input item's small element and activates it's visibility

    
  */

  showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('small');
    formControl.className = 'form__control error';
    errorMessage.innerText = message;
  }

  /*


    Display input success indication

    
  */

  showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form__control success';
  }

  /*


    Returns the input id with the first letter set to UPPERCASE

    
  */

  messageToUpper(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  /*


    Validate form inputs

    
  */

  checkRequired(callBackFunction, title, ...inputs) {
    // Check if title value is empty
    if (title.value !== '') {
      this.showSuccess(title);
      // Check if any of the inputs has a value
      if (inputs.length > 0 && inputs[0].value.trim() !== '') {
        // Display a success indication for every input element that has a value
        inputs.forEach((input) => {
          if (input.value.trim() !== '') {
            this.showSuccess(input);
          }
        });
      }

      const projectInfo = {
        title: title.value,
        description: this.description.value,
        tooltipText: this.tooltip.value,
      };

      // Pass Project information to the createProject function for further processing.
      callBackFunction(projectInfo);
      return true;
    } else {
      // Show error indication if title value is empty
      this.showError(title, `${this.messageToUpper(title)} is required.`);
      return false;
    }
  }

  /*


    Close the form and remove overlay's event listener

    
  */

  closeProjectCreationForm() {
    this.formContainer.classList.remove('visible');
    this.overlay.classList.remove('visible');

    DOMHelper.clearEventListeners(this.overlay);
  }

  /*


    - Add create project button functionality to open the form
    - Adds closing functionality to the overlay when opened

    
  */

  addEventListeners(callBackFunction) {
    this.popupBtn.addEventListener('click', (e) => {
      this.overlay = document.querySelector('.overlay');
      this.formContainer.classList.add('visible');
      this.overlay.classList.add('visible');

      this.overlay.addEventListener(
        'click',
        this.closeProjectCreationForm.bind(this)
      );
    });

    // Add close button functionality
    this.formContainer
      .querySelector('.close-btn')
      .addEventListener('click', this.closeProjectCreationForm.bind(this));

    // Add form submit functionality
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const succeeded = this.checkRequired(
        callBackFunction,
        this.title,
        this.description,
        this.tooltip
      );
      if (succeeded) {
        this.inputs.forEach((input) => {
          input.value = '';
        });
      }
    });
  }
}
