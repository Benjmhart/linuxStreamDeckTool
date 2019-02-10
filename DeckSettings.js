'use strict';

module.exports = class DeckSettings {
  constructor(config, streamDeck) {
    this.streamDeck = streamDeck;
    this.brightness = true;
    this.folders = {};
    this.currentFolder = 'root';
    this.config = config;
    this.buildFolder('root', config);
  }

  buildFolder(folderName, config) {
    if (!config.folders[folderName] || this.folders[folderName]) {
      // folder does not exist in config OR folder is already built
      return;
    }

    this.folders[folderName] = new Array(15).fill({}).map((item, index) => {
      const newBtn = { id: index };
      const configBtn = config.folders[folderName].find(x => x.id === index);
      if (!configBtn) {
        return newBtn;
      }

      Object.entries(configBtn).forEach(([key, value]) => {
        newBtn[key] = value;
      });
      return newBtn;
    });
  }

  findButton(i) {
    return this.folders[this.currentFolder][i];
  }

  getButtonArray() {
    return this.folders[this.currentFolder];
  }

  toggleBrightness() {
    this.brightness ? this.streamDeck.setBrightness(0) : this.streamDeck.setBrightness(100);
    this.brightness = !this.brightness;
  }

  paintButtons() {
    const buttons = this.getButtonArray();
    if (buttons) {
      buttons.forEach(button => {
        if (button.image) {
          return this.streamDeck.fillImageFromFile(button.id, button.image);
        }
        if (button.color) {
          return this.streamDeck.fillColor(button.id, ...button.color);
        }
        this.streamDeck.fillColor(button.id, 0, 0, 0);
      });

      console.log('keys painted');
    }
  }

  switchFolder(folderName) {
    console.log('switching folder');
    this.currentFolder = folderName;
    this.buildFolder(folderName, this.config);
    this.paintButtons();
  }
};
