# Stream Deck Linux Daemon

this is a basic system to create automation with Streamdeck in Linux based systems. currently, you need to clone the repo, create a streamDeckrc.json file in your home directory or home/.local/.share, and add any graphics by full path.

## usage

    sudo npm start

## config

configuration is a JSON file with the following shape:

```
{
  folders:{
    "<folderName>" : [Button]
  }
  macros: {
    "<macroName>": [Action]
  }
}
```

## build notes

due to a dependancy issue, this project requires node 8.15

### Folders

the default folder is root, you should always have a root folder, each folder is an array of buttons. note: if you create a folder other than root, it is highly recommended that one of the buttons in that folder contain a link back to the root folder. see the example streamDeckrc.json file below for details

a folder can hold up to 16 buttons (for a full size streamdeck device)

### Macros

these are essentially stored sequences of actions that can be more easily called as single actions in the form `{macro: "macroName"}`. see the section on actions or the example configuration for more info.

### Buttons

Buttons represent the configuration and actions tied to a button. each button has the following properties:

```
{
  "id": 0 // Integer
  "image": "/home/user/image.png" // absolute path only
  "color": [(0-255),(0-255),(0-255)] // RGB
  "actions": [action] //an array of actions performed on press
}
```

id - this determines the button's position on the device. buttons are numbered right to left, top to bottom, or in the following order:
| | | | | |
| :-: | :-: | :-:|:-:|-:|
| 4 | 3 | 2 |1 | 0 |
| 9 | 8 | 7 |6 | 5 |
| 14 | 13 | 12 |11 | 10 |

image - (optional) an image to be painted on the button, supports png and svg.

color - (optional) a color to paint the button (disregarded if the button has an image, defaults to black)

actions - an array of actions (see action section or example configuration for more info)

### Actions

actions are simple instructions that can simulate keyboard activity, or manipulate the streamdeck itself, typically these are provided as an array of objects, here are some example actions of each type

```
      { "keyTap": "enter" }
      { "keyToggle": ["control", "down", []] }
      { "keyToggle": ["control", "up", []] }
      { "folderLink": "root" }
      { "settings": "toggleBrightness" }
      { "typeString": "Hello, World!" }
      { "macro": "copy" }
```

keytap - this simulates a keystroke of the named key. for a reference for key names, see the RobotJS documents https://robotjs.io/docs/syntax#keytogglekey-down-modifier

keyToggle - this simulates the hold or release of a key, you can also add modifiers that will be held down with your key.

so, for example `["command", "down", ["shift"]]` holds down both command and shift keys until a late action shaped like `["command", "up", ["shift"]]` is called.

beware, keys that are pressed down need to be released or you may experience severe side effects.

folderLink - this means the button will switch the active folder to the named folder if that folder exists in your configuration. all keys will be replaced with the keys in that folder, whether or not they exist.

settings - this is a collection of actions saved internally, currently we support only the toggleBrightness settings action, which turns streamdeck backlights on and off

typeString - this will type the provided string text directly at your current active cursor.

macro - this will call the actions stored in the named macro, if it exists.

## Example config

this config contains two folders, 'root' and 'fldr1', it also contains four macros, 'cut', 'copy', 'paste', and 'openLine'

```
{
  "folders": {
    "root": [
      {
        "id": 0,
        "image": "/home/bhart/projects/streamDeck/images/baseline-power_settings_new-24px.svg",
        "actions": [{ "settings": "toggleBrightness" }]
      },
      {
        "id": 1,
        "image": "/home/bhart/projects/streamDeck/images/ic_featured_play_list_48px.svg",
        "actions": [
          { "keyTap": "end" },
          { "keyTap": "enter" },
          { "typeString": "console.log()" },
          { "keyTap": "left" }
        ]
      },
      {
        "id": 2,
        "color": [150, 150, 255],
        "actions": [
          { "macro": "copy" },
          { "macro": "openLine" },
          { "typeString": "console.log('" },
          { "macro": "paste" },
          { "typeString": "', " },
          { "macro": "paste" },
          { "typeString": ")" }
        ]
      },
      {
        "id": 3,
        "color": [255, 150, 0],
        "actions": [{ "folderLink": "fldr1" }]
      }
    ],
    "fldr1": [
      {
        "id": 0,
        "color": [255, 150, 0],
        "actions": [{ "folderLink": "root" }]
      }
    ]
  },
  "macros": {
    "cut": [
      { "keyToggle": ["control", "down", []] },
      { "keyTap": "x" },
      { "keyToggle": ["control", "up", []] }
    ],
    "copy": [
      { "keyToggle": ["control", "down", []] },
      { "keyTap": "c" },
      { "keyToggle": ["control", "up", []] }
    ],
    "paste": [
      { "keyToggle": ["control", "down", []] },
      { "keyTap": "v" },
      { "keyToggle": ["control", "up", []] }
    ],
    "openLine": [
      { "keyTap": "end" },
      { "keyTap": "end" },
      { "keyTap": "enter" }
    ]
  }
}

```

## future roadmap

- work with npm link, figure out how to make it not require sudo
- electron app to build a config for you
- distribute via npm
- distribute as executable
- distribute via apt install / brew
- babel setup - optional chaining feature
- linting, tests?
- allow config file path to be passed as an argument
