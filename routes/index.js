const PLACES = require("../data/places");

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/places", (req, res, next) => {
  res.json(PLACES);
});

module.exports = router;
