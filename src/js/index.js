import { App } from './app';

// Initialise app
const app = new App();

const projectOne = {
  title: 'Deliver the new placefinder Web app',
  description: 'Our client needs this done ASAP',
  tooltipText: "Don't forget to discuss the new proposition with John",
  state: 'active',
};

const projectTwo = {
  title: 'Build a portfolio',
  description: 'Improve brand recognition',
  tooltipText: 'Incorporate A/B testing',
  state: 'finished',
};

// Create 2 dummy projects
app.createProject(projectOne);
app.createProject(projectTwo);
