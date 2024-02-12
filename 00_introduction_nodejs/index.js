// Work with file system.
const fs = require("fs");

// This method is a synchronous method. the execution is blocked while execution of the code.
const dataWithSync = fs.readFileSync("./files/demo.txt", "utf-8");

console.log(dataWithSync);

// This method works asynchronously, or non blocking way.
fs.readFile(
  `${__dirname}/files/demo.txt`,
  (err, data) => {
    if (err) throw new Error("Some error occur");
    console.log('Data from async function -> '+data);
  }
);


