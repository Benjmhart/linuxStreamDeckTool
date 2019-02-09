const StreamDeck = require('elgato-stream-deck');
const DeckSettings = require('./DeckSettings');
const config = require('./streamDeckrc.js');

const robo = require('robotjs');

const init = () => {
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
  return [sd, settings];
};

module.exports = init;
