const { headComponent } = require('./components/headComponent');
const { mainComponent } = require('./components/mainComponent');
const { bodyComponent } = require('./components/bodyComponent');
const { footerComponent } = require('./components/footerComponent');
const {
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
  displayContent,
} = require('./display/sections');

module.exports = {
  // low-level components (Work/src/components/)
  headComponent,
  mainComponent,
  bodyComponent,
  footerComponent,
  // display pipeline sections (packages/template-runtime-display)
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
  displayContent,
};
