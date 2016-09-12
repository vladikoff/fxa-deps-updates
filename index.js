'use strict';

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const PROJECT_PATH = path.resolve(path.join(__dirname, 'projects'));

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

  nsp.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  nsp.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
});
