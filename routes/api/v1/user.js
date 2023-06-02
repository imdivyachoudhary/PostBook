const express = require('express');
const router = express.Router();

const userApiController = require("../../../controllers/api/v1/userApiController");

router.post("/sign-in",userApiController.loginUser);
   
module.exports = router;