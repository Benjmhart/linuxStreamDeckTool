const robo = require("robotjs");

executeAction = (action, settings) => {
  console.log("running executeAction", action);
  action.keyTap && robo.keyTap(action.keyTap);
  action.typeString && robo.typeString(action.typeString);
  action.keyToggle && robo.keyToggle(...action.keyToggle);
  action.macro &&
    settings.config.macros[action.macro].forEach(a =>
      executeAction(a, settings)
    );
  if (action.settings) {
    action.settings === "toggleBrightness" &&
      settings.toggleBrightness();
  }

  if (action.folderLink) {
    settings.switchFolder(action.folderLink);
    //console.log('folders not implemented in executeAction');
  }
};

module.exports = executeAction;
