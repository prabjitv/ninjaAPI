const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

// get a list of ninjas from the db
router.get("/ninjas", function (req, res, next) {
  // Ninja.find({}).then(function(ninjas){
  //   res.send(ninja);
  // });
  Ninja.aggregate()
    .near({
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      },
      maxDistance: 1000000,
      spherical: true,
      distanceField: "dis",
    })
    .then(function (ninjas) {
      res.send(ninjas);
    });
});

// add a new ninja to the db
router.post("/ninjas", function (req, res, next) {
  Ninja.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

// 600204b471f0476b68291bf7 ted -80, 25.791
// 60020556c1699b5b70b9afd7 geoboi -80.243, 22.191

// update a ninja in the db
router.put("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
      res.send(ninja);
    });
  });
});

// delete a ninja from the db
router.delete("/ninjas/:id", function (req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

module.exports = router;
