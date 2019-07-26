const app = require("./app"); //from same folder
const http = require("http"); //from modules

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

function normalizePort(val){
  const port = parseInt(val, 10);
  if(isNaN(port)) {
    return val;
  }
  if(port >= 0){
    return port;
  }
  return false;
}

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
  console.log("BE CONSISTENT, BUILD DILIGENCE");
  console.log("Be confident to push the time frame");
});
