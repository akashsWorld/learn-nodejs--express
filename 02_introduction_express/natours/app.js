const express = require("express");
const app = express();
const fs = require("fs");
const { STATUS_CODES } = require("http");

//This Section is for demo code.

// Middle wares are the fucntions which are execute before the request came into request handler.
// Middle wares are execute in the order in which they are define.
// Like for the below middle ware which is only executes for the app.post method
// not for the app.get method.
// If any middle ware are define after or before of any middle ware then it also execute after,
// or before of that middle ware.
// This Middle ware parse the request bosy into a javascript object,
// {express.json() reqturn the middleware function.}.
app.use(express.json());

// This is a middle ware function which execute after the above middle ware.
// This two middle wares are only valid for app.post not for get because
// the middle wares are define after app.get().
app.use((req, res, next) => {
  console.log(req.url);

  // The next() method forware the request to next stage.{Middleware, Request Handler}
  next();
});

app.post("/name", (req, res) => {
  const body = req.body;

  console.log(body);

  res.status(200).send();
});

// If add a question mark after param name then it will be a optional param,
// Which may have any value or not.
app.post("/name/:id/:surname?", (req, res) => {
  const body = req.body;
  // Javascript object which have all the params.
  const param = req.params;

  console.log(param);

  console.log(body);

  res.status(200).send();
});

// Natours project code.

app.get("/tours/:id?", (req, res) => {
  const id = req.params.id;

  if (id !== undefined) {
    fs.readFile(
      `${__dirname}/dev-data/data/tours.json`,
      "utf-8",
      (err, content) => {
        const data = JSON.parse(content);
        const tour = data.filter((each, ind) => {
          if (ind == id) {
            return each;
          }
        });
        return res.send({
          status: "success",
          results: tour.length,
          data: tour,
        });
      }
    );
    return;
  }

  fs.readFile(
    `${__dirname}/dev-data/data/tours.json`,
    "utf-8",
    (err, content) => {
      const data = JSON.parse(content);
      res.send({
        status: "success",
        results: data.length,
        data: data,
      });
    }
  );
});

app.post("/tours", (req, res) => {
  const data = req.body;

  fs.readFile(
    `${__dirname}/dev-data/data/tours.json`,
    "utf-8",
    (err, content) => {
      const tours = JSON.parse(content);
      tours.push(data);

      fs.writeFile(
        `${__dirname}/dev-data/data/tours.json`,
        JSON.stringify(tours),
        (err) => {
          // This call back always run err occur or not.
          if (err) {
            res.status(401).send({
              status: "failed",
              message: "Operation unsuccessful.",
            });
            return;
          }
        }
      );
      res.send({
        status: "success",
        message: "File saved successfull",
      });
    }
  );
});

app.delete("/tours/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(
    `${__dirname}/dev-data/data/tours.json`,
    "utf-8",
    (err, content) => {
      const data = JSON.parse(content);
      const tour = data.filter((each, ind) => {
        if (ind != id) {
          return each;
        }
      });

      fs.writeFile(
        `${__dirname}/dev-data/data/tours.json`,
        JSON.stringify(tour),
        (err) => {
          if (err) {
            res.send({
              status: "failed",
              message: err.message,
            });
            return;
          }
        }
      );

      res.status(200).send({
        status: "success",
      });
      return;
    }
  );
});

module.exports = app;
