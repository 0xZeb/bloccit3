
const express = require("express");
const router = express.Router();
const adController = require("../controllers/adController");


router.get("/advert", adController.index);

router.get("/advert/new", adController.new);

router.post("/advert/create", adController.create);

router.get("/advert/:id", adController.show);

router.post("/advert/:id/destroy", adController.destroy);

router.get("/advert/:id/edit", adController.edit);

router.post("/advert/:id/update", adController.update);


module.exports = router;
