'use strict';
// in button functions, make them curried functions that  take settings as the first arguement,  they will be partially applied as they are added to the settings class, so that you can use the settings object to refer to the parent DeckSettings instance.

// also curry
const path = require('path');
const robo = require('robotjs');
const iohook = require('iohook');

module.exports = {
  folders: {
    root: [
      {
        id: 0,
        image: path.resolve(__dirname, 'baseline-power_settings_new-24px.svg'),
        func: settings => (deck, key) => {
          settings.brightness ? deck.setBrightness(0) : deck.setBrightness(100);
          settings.brightness = !settings.brightness;
        }
      }
    ]
  }
};
