var express = require("express");
var router = express.Router();
var db = require("../models");
var sequelize= require("sequelize");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  var query;
  if (req.query.CustomerId){
    query = {CustomerId : CustomerId}
  }
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll({
    include: db.Customer, 
    where: query, 
    order: sequelize.col("burger_name")
  }).then(function(data) {
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    var burger_data = data.map(x => x.dataValues);
    var hbsObject = 
    { Burger: burger_data};
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  db.Burger.create(req.body).then(function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

router.post("/burgers/customer", function(req, res){
  db.Customer.create(req.body).then(function(result){
    res.json(result);
  })
})

// put route -> back to index
router.put("/burgers/update/:id", function(req, res) {
  db.Burger.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .done in Ajax
    res.json("/");
  });
});

module.exports = router;
