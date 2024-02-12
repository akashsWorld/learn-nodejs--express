// Work with file system.
const fs = require("fs");
const http = require("http");
const url = require('url');

// This method is a synchronous method. the execution is blocked while execution of the code.
const dataWithSync = fs.readFileSync("./files/demo.txt", "utf-8");

console.log(dataWithSync);

// This method works asynchronously, or non blocking way.
fs.readFile(`${__dirname}/files/demo.txt`, (err, data) => {
  if (err) throw new Error("Some error occur");
  console.log("Data from async function -> " + data);
});

const data = fs.readFileSync(`${__dirname}/files/data.json`, "utf-8");

// Create Server using http object.

const server = http.createServer((req, res) => {

  const {pathname, query} = url.parse(req.url,true);

  if (pathname === "/" || pathname === "/overview") {
    res.end("This is a Overview route.");
  } else if (pathname === "/about") {
    res.end("This is about route.");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(JSON.stringify(data));
  }else if(pathname === '/getQuery'){
    res.end(query['id']);
  }else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello this is a demo header.",
    });
    res.end("<h1>Hello from http server in nodeJS</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening on port 8000");
});
