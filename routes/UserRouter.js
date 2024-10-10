const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/UserControllers");

router.post("/create", UserControllers.createUser);

module.exports = router;
