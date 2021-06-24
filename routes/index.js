const PLACES = require("../data/places");

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/places", (req, res) => {
  const response = req.query.id ? PLACES[req.query.id] : PLACES;
  res.json(response);
});

module.exports = router;
