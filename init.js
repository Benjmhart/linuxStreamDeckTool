const StreamDeck = require("elgato-stream-deck");
const DeckSettings = require("./DeckSettings");
const getConfig = require("./getConfig");

const config = getConfig();
const robo = require("robotjs");

const executeAction = require("./executeAction");

const init = () => {
  const streamDeck = new StreamDeck();
  const settings = new DeckSettings(config, streamDeck);

  streamDeck.on("down", keyIndex => {
    console.log("key %d down", keyIndex);
    const key = settings.findButton(keyIndex);
    key && key.func && key.func(streamDeck, key);
    key &&
      key.actions &&
      key.actions.forEach(action =>
        executeAction(action, settings)
      );
  });

  streamDeck.on("error", error => {
    console.error(error);
  });

  console.log("running");
  settings.paintButtons();
  return [streamDeck, settings];
};

module.exports = init;
