const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController");

router.get("/topics/:topicId/flairs/new", flairController.new);

module.exports = router;
