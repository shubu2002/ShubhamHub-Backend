const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller")
const schema = require("../validators/auth-validators")

const authMiddleware = require("../middlewares/auth-middleware")

const validate = require("../middlewares/validate-middleware")



router.route("/").get(authcontroller.home);


router
.route("/register")
.post(validate(schema.signupSchema),authcontroller.register);

router.route("/login").post(validate(schema.loginSchema),authcontroller.login);

router.route("/user").get(authMiddleware,authcontroller.user);

module.exports = router;