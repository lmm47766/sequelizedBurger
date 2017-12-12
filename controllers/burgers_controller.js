var db = require("../models");

// =============================================================
module.exports = function(app) {


  app.get("/", function(req, res) {
    db.Burger.findAll({}).then(function(data) {
      var nDev = [];
      var dev = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].devoured) {
          dev.push(data[i]);
        } else {
          nDev.push(data[i]);
        }
      }
      res.render("index", {
        notDevoured: nDev,
        devoured: dev
      });
    });
  });

  app.post("/todos", function(req, res) {

    db.Burger.create({
      burger_name: req.body.burger
    }).then(function(data) {
      res.end();
    });

  });

  app.put("/update/:id", function(req, res) {

    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.end();
    })
  });

  app.delete("/delete", function(req, res) {

    db.Burger.destroy({
      where: {
        devoured: true
      }
    }).then(function(data) {
      res.end();
    });

  });


}

