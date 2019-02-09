'use strict';

const usb = require('usb-detection');
const init = require('./init');
const terminator = require('./terminator');
// Automatically discovers connected Stream Decks, and attaches to the first one.
// Throws if there are no connected stream decks.
// You also have the option of providing the devicePath yourself as the first argument to the constructor.
// For example: const myStreamDeck = new StreamDeck('\\\\?\\hid#vid_05f3&pid_0405&mi_00#7&56cf813&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}')
// Device paths can be obtained via node-hid: https://github.com/node-hid/node-hid

usb.startMonitoring();
let devices = [];

const deviceTest = device => {
  return (device.deviceName === 'Stream Deck' || device.deviceName === 'Stream_Deck') && (device.manufacturer === 'Elgato Systems' || device.manufacturer === 'Elgato_Systems');
};

usb.find((err, devices) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  const connected = devices.find(deviceTest);
  if (connected) {
    console.log('already connected, initializing');
    const [sd, settings] = init();
    devices.push(sd, settings);
  }
});

usb.on('add', device => {
  if (deviceTest(device)) {
    console.log('connection detected, initializing');
    const [sd, settings] = init();
    devices.push(sd, settings);
  }
});

usb.on('remove', device => {
  console.log('removed', device);
  if (deviceTest(device)) {
    console.log('device removed, cleaning up memory');
    devices = [];
  }
});

console.log('listening');

const exitHandler = () => {
  console.log('quitting, cleanup');
  usb.stopMonitoring();
  terminator(process.pid);
};

process.on('exit', () => exitHandler());
process.on('SIGINT', () => exitHandler());
process.on('SIGTERM', () => exitHandler());
