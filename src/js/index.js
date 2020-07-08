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

app.createProject(projectOne);
app.createProject(projectTwo);

// Add 2 dummy projects
// app.createProject(
//   'Deliver the new placefinder Web app',
//   'Our client needs this done ASAP',
//   "Don't forget to discuss the new proposition with John",
//   'active'
// );
// app.createProject(
//   'Build a portfolio',
//   'Improve brand recognition',
//   'Incorporate A/B testing',
//   'finished'
// );
