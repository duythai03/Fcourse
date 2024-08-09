const express = require("express");
const router = express.Router();

const coursesController = require("../app/controllers/CoursesController");

router.use("/create", coursesController.create);
router.post("/store", coursesController.store);
router.use("/:_id/edit", coursesController.edit);
router.put("/:_id", coursesController.update);
router.delete("/:_id", coursesController.delete);
router.use("/:slug", coursesController.show);

module.exports = router;
