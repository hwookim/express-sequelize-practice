const PLACES = require("../data/places");

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/places", (req, res) => {
  const response = req.query.id ? PLACES[req.query.id] : PLACES;
  if (!response) {
    res.status(404).send("not found");
  }
  res.json(response);
});

router.get("/places/:id", (req, res) => {
  const response = PLACES[req.params.id];
  if (!response) {
    res.status(404).send("not found");
  }
  res.json(response);
});

router.post("/places", (req, res) => {
  const { body } = req;
  PLACES.push(body);
  res.json(body);
});

module.exports = router;
