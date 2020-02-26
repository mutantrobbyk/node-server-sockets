const { exec } = require("child_process");
const _ = require("lodash");
const fs = require("fs");

module.exports = {
  report: () => {
    if (!fs.existsSync("reports")) {
      fs.mkdirSync("reports");
    }
    const array = (arr, num) => {
      const newArr = arr.filter(el => {
        return (
          el !== "" &&
          !el.startsWith("cl") &&
          !el.startsWith("se") &&
          !el.startsWith("to")
        );
      });
      const clientTotal = Number(newArr[0]);
      const serverTotal = newArr.slice(1, 5).reduce((curr, acc) => {
        return curr + Number(acc);
      }, 0);
      fs.appendFile(
        `reports/reports.txt`,
        `Client Id: ${num} - Client Sent Total:${clientTotal} | Server Reports: ${num}-1: ${newArr[1]}  ${num}-2: ${newArr[2]}  ${num}-3: ${newArr[3]}  ${num}-4: ${newArr[4]}  Server Total: ${serverTotal} \n`,
        err => {
          if (err) throw err;
        }
      );
    };
    const mapNumber = _.range(60);
    mapNumber.map(el => {
      exec(
        `wc -l clientFiles/client${el}.txt serverFiles/client_${el}-1.txt serverFiles/client_${el}-2.txt serverFiles/client_${el}-3.txt serverFiles/client_${el}-4.txt`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("stderr", stderr);
            throw error;
          }
          const test = stdout.split(" ");
          array(test, el);
        }
      );
    });
  }
};
