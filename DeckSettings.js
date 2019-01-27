'use strict';

module.exports = class DeckSettings {
  constructor(config) {
    this.brightness = true;
    this.state = { folder: 'root' };
    this.folders = {};
    this.buildFolder('root', config);
    console.log('root folder buttons', this.folders.root);
  }

  buildFolder(folderName, config) {
    this.folders[folderName] = new Array(15).fill({}).map((item, index) => {
      const newBtn = { id: index };
      const configBtn = config.folders['root'].find(x => x.id === index);
      if (!configBtn) {
        return newBtn;
      }

      Object.entries(configBtn).forEach(([key, value]) => {
        if (typeof value !== 'function') {
          newBtn[key] = value;
          return;
        }
        newBtn[key] = value(this);
      });
      return newBtn;
    });
  }

  findButton(i) {
    return this.folders.root[i];
  }

  getButtonArray() {
    return this.folders.root;
  }
};
