import path from "path";
import fs from "fs";
import koa from "koa";
import compress from "koa-compress";
import serveStatic from "koa-static";
import jade from "koa-jade";

const app = koa();

app.use(compress());
app.use(serveStatic(path.join(__dirname, "public")));
app.use(jade.middleware({viewPath: path.join(__dirname, "views")}));

app.use(function* (next) {
  const stats = yield getStats();

  this.render("index", {...stats});
});

const getStats = () => new Promise((resolve, reject) => {
  const defaults = {js:[],css:[]};

  try {
    fs.readFile(path.join(__dirname, "webpack-stats.json"), (err, str) => {
      if (err) {
        reject(defaults);
      }
      else {
        const json = JSON.parse(str);

        resolve(json);
      }
    });
  }
  catch (ex) {
    reject(defaults);
  }
});

app.listen(3000, () => {
  console.log("examples/simple running on localhost:3000.");
});
