//Run this file with command 'node harnessController.js'
//File permissions may need to be changed for this to execute

const { exec, execFile } = require("child_process");
const _ = require("lodash");
const report = require('./reporting')
const number = _.range(60);
const outputHandler = (error, stdout, stderr) => {
  console.error(error);
  console.log(stderr);
};
exec(`nodemon`, outputHandler);
number.map(el => {
  exec(`pwd`);
  exec(`node src/controllers/clientController.js ${el}`, outputHandler);
});
setTimeout(() => {
  exec(`killall node`, outputHandler);
  exec(`killall nodemon`, outputHandler);
  report.report()
}, 1000 * 60 * 60);
