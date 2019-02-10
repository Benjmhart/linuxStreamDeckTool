"use strict";
const path = require("path");
const os = require("os");
const paths = [
  "./streamDeckrc.json",
  "./streamdeckrc.json",
  path.join(require("os").homedir(), "/streamDeckrc.json"),
  path.join(require("os").homedir(), "/streamdeckrc.json"),
  path.join(
    require("os").homedir(),
    "/.local/share/streamDeckrc.json"
  ),
  path.join(
    require("os").homedir(),
    "/.local/share/streamdeckrc.json"
  )
];

const getConfig = (pathIndex = 0) => {
  let config;

  try {
    const maybeConfig = require(paths[pathIndex]);
    if (maybeConfig) {
      config = maybeConfig;
      console.log("config found at: ", paths[pathIndex]);
    }
  } catch (err) {
    console.log(
      "warning during config search",
      err.message
    );
  }
  if (config) {
    return config;
  }

  if (paths[pathIndex + 1]) {
    return getConfig(pathIndex + 1);
  }
  console.log("unable to locate config file");
  return process.exit();
};

module.exports = getConfig;
