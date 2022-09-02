const router = require("express").Router();
const UserController = require("../../controller/user.controller");

router.route("/user").get(UserController.users).post(UserController.addUser);
router
  .route("/user/:id")
  .get(UserController.UserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route("/user/bulk/update").put(UserController.bulkUpdate);
module.exports = router;
