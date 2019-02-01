'use strict';
// in button functions, make them curried functions that  take settings as the first arguement,  they will be partially applied as they are added to the settings class, so that you can use the settings object to refer to the parent DeckSettings instance.

// also curry
const path = require('path');
const iohook = require('iohook');

// robo can be used to automate keystrokes, mousemovement etc.
// iohook can listen for other keyboard behaviours.

module.exports = {
  folders: {
    root: [
      {
        id: 0,
        image: path.resolve(__dirname, './images/baseline-power_settings_new-24px.svg'),
        func: settings => (deck, key) => {
          settings.brightness ? deck.setBrightness(0) : deck.setBrightness(100);
          settings.brightness = !settings.brightness;
        }
      },
      {
        id: 1,
        image: path.resolve(__dirname, './images/ic_featured_play_list_48px.svg'),
        actions: ['end', 'enter', ':console.log()', 'left']
      }
    ]
  }
};
