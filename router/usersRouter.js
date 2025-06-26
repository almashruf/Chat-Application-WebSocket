const express = require("express");
const { check } = require("express-validator");

const { getUsers } = require("../controller/usersController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUsersValidators } = require("../middlewares/users/userValidators");

const router = express.Router();

//login page

router.get("/", getUsers);
router.post("/", avatarUpload, addUserValidators);

module.exports = router;
