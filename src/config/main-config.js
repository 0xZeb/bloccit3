require("dotenv").config();

// any middlewares must be configured in this folder, which happens before Express.

const path = require("path");
const viewsFolder =  path.join(__dirname, "..", "views");



 module.exports = {
   init(app, express){
     app.set("views", viewsFolder);
     app.set("view engine", "ejs");
     app.use(express.static(path.join(__dirname, "..", "assets")));
   }
 }
