'use strict';

const StreamDeck = require('elgato-stream-deck');
const DeckSettings = require('./DeckSettings');
const config = require('./streamDeckrc.js');

const robo = require('robotjs');

// Automatically discovers connected Stream Decks, and attaches to the first one.
// Throws if there are no connected stream decks.
// You also have the option of providing the devicePath yourself as the first argument to the constructor.
// For example: const myStreamDeck = new StreamDeck('\\\\?\\hid#vid_05f3&pid_0405&mi_00#7&56cf813&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}')
// Device paths can be obtained via node-hid: https://github.com/node-hid/node-hid

const sd = new StreamDeck();
const settings = new DeckSettings(config, sd);

sd.on('down', keyIndex => {
  console.log('key %d down', keyIndex);
  const key = settings.findButton(keyIndex);
  key && key.func && key.func(sd, key);
  key &&
    key.actions &&
    key.actions.forEach(action => {
      if (action.charAt(0) === ':') {
        console.log('ToType: ', action.substr(1));
        return robo.typeString(action.substr(1));
      }
      console.log('keytap: ', action);
      robo.keyTap(action);
    });
});

sd.on('error', error => {
  console.error(error);
});

console.log('running');
settings.getButtonArray().forEach(button => {
  if (button.image) {
    sd.fillImageFromFile(button.id, button.image);
  } else {
    sd.fillColor(button.id, 0, 0, 0);
  }
});
console.log('keys initially painted');
