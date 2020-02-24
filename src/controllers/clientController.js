const io = require("socket.io-client");
const args = process.argv.slice(2);
const _ = require("lodash");
const fs = require("fs");
const pagesSent = {};
const data = {
  id: Number(args[0]),
  message:
    "aplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqoaplwekgiapasleinvpsdlkjasd;flkja;dlfkja;sldkfj;alskdj;lkjianeiofiojhasefiojefaepooipiepwipewriouperwiouperwoipueriuopewriouperwioueiopurewqo"
};

const interval = device => {
  if (!pagesSent[device]) pagesSent[device] = 0;
  pagesSent[device] += 1;
  socket.emit("join new room", { ...data, device, page: pagesSent[device] });
  if (!fs.existsSync("clientFiles")) {
    fs.mkdirSync("clientFiles");
  }
  fs.appendFile(
    `clientFiles/client${data.id}.txt`,
    `${data.id}-${device}-${pagesSent[device]} \n`,
    err => {
      if (err) throw err;
      // console.log("File Append Successful");
    }
  );
};
var socket = io.connect("http://localhost:3550");
setInterval(() => interval(1), _.random(2000, 6000));
setInterval(() => interval(2), _.random(2000, 6000));
setInterval(() => interval(3), _.random(2000, 6000));
setInterval(() => interval(4), _.random(2000, 6000));

process.stdin.resume();
