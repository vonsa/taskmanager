# Task Manager

### Contains the following classes:

#### App

Ties everything together.

- Creates Active and Finished project lists on initialisation.
- Handles the create project function which instantiates a new ProjectItem class and pushes it to the appropriate ProjectList instance.

#### DOMHelper

Contains static functions to interact with the DOM

#### Tooltip

Creates the tooltip and manages the corresponding page overlay.
The Cmp class takes care of attaching & detaching of the tooltip in the DOM

#### Component (Cmp)

Attaches & detaches the tooltip

#### ProjectList

Handles drag events and holds instances of the ProjectItem class

#### ProjectItem

Contains project properties
Is passed a callback function to switch a project to another list
Initiates and stores a tooltip instance

#### FormControl

Handles form creation, processing and removal.
Is passed a callback function to create a new project in the App class instance.
