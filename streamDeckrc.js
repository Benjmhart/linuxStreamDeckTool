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
        image: '/home/bhart/projects/streamDeck/images/baseline-power_settings_new-24px.svg',
        actions: [{ settings: 'toggleBrightness' }]
      },
      {
        id: 1,
        image: '/home/bhart/projects/streamDeck/images/ic_featured_play_list_48px.svg',
        actions: [{ keyTap: 'end' }, { keyTap: 'enter' }, { typeString: 'console.log()' }, { keyTap: 'left' }]
      }
    ]
  }
};
