var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  router.post("/api/burgers", function(req, res) {
    burger.insert(["burger_name"], [req.body.name], function(result) {
      // Send back the ID of the new quote
      res.redirect('/');
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
  
    burger.update(["devoured"],[req.body.devoured], [req.params.id],
      function(result) {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
  
      }
    );
  });

module.exports = router;