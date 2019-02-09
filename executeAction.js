const robo = require('robotjs');

module.exports = (action, settings) => {
  console.log('running executeAction');
  action.keyTap && robo.keyTap(action.keyTap);
  action.typeString && robo.typeString(action.typeString);
  action.keyToggle && robo.keyToggle(action.keyToggle);
  if (action.settings) {
    action.settings === 'toggleBrightness' && settings.toggleBrightness();
  }
  if (action.folder) {
    console.log('folders not implemented in executeAction');
  }
};
