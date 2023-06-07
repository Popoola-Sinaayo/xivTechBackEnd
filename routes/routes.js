const express = require("express");
const router = express.Router();
const validator = require("../validators/validator")
const controller = require("../controller/controller")

router.post("/getWeather", validator.validate, controller.getWeather)

module.exports = router;
