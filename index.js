'use strict';

const fs = require('fs');
const raven = require('raven');
const path = require('path');
const spawn = require('child_process').spawn;

const PROJECT_PATH = path.resolve(path.join(__dirname, 'projects'));
const RAVEN_CLIENT_URL = process.env.RAVEN_CLIENT_URL;

let client = null;

if (RAVEN_CLIENT_URL) {
  client = new raven.Client(RAVEN_CLIENT_URL);
}

function getProjects(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var dirs = getProjects(PROJECT_PATH);
dirs.forEach(function (dir) {
  let projectDir = path.join('projects', dir);
  let nsp = spawn('../../node_modules/.bin/nsp', ['check', 'package.json', '--output=json'], {
    cwd: projectDir
  });

  let nspOutput = '';

  nsp.stderr.on('data', (data) => {
    nspOutput += data;
  });

  nsp.stderr.on('close', () => {
    try {
      let nspJson = JSON.parse(nspOutput);

      nspJson.forEach(function (report) {
        let nspMessage = dir + ' ' + report.module + ' ' + report.version;
        let nspTags = {tags: report};

        if (RAVEN_CLIENT_URL) {
          client.captureMessage(nspMessage, nspTags)
        } else {
          console.log(nspMessage, nspTags);
        }
      });
    } catch (e) {
    }
  });
});
