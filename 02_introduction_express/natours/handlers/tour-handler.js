const fs = require('fs');

const getTours = (req, res) => {
  const id = req.params.id;

  if (id !== undefined) {
    fs.readFile(
      `${__dirname}/../dev-data/data/tours.json`,
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
    `${__dirname}/../dev-data/data/tours.json`,
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
};

const saveTours = (req, res) => {
  const data = req.body;

  fs.readFile(
    `${__dirname}/../dev-data/data/tours.json`,
    "utf-8",
    (err, content) => {
      const tours = JSON.parse(content);
      tours.push(data);

      fs.writeFile(
        `${__dirname}/../dev-data/data/tours.json`,
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
};

const deleteTours = (req, res) => {
  const id = req.params.id;

  fs.readFile(
    `${__dirname}/../dev-data/data/tours.json`,
    "utf-8",
    (err, content) => {
      const data = JSON.parse(content);
      const tour = data.filter((each, ind) => {
        if (ind != id) {
          return each;
        }
      });

      fs.writeFile(
        `${__dirname}/../dev-data/data/tours.json`,
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
};


module.exports={saveTours,getTours,deleteTours};