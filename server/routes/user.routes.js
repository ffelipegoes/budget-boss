const UserController = require("../controllers/UserController");
const checkToken = require("../middlewares/verify-token");

const router = require("express").Router();

router.post("/signIn", UserController.SignIn);
router.post("/logIn", UserController.Login);
router.put("/update", checkToken, UserController.updateUser)


module.exports = router