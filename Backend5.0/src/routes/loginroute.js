const express = require("express");
const router = express.Router();
const controllogin = require("../controllers/controllogin");
const {registerauth} = require("../middlewares/auth");


router.get("/",function (req, res) {
  controllogin.get(req, res);
});

router.post("/",[registerauth], function (req, res) {
    controllogin.post(req, res);
});

module.exports = router;
