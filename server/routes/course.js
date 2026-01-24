const express = require("express");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const {
  createCourse,
  getCourses
} = require("../controllers/course");

const router = express.Router();

router.post("/create", auth, upload.single("thumbnail"), createCourse);
router.get("/", getCourses);

module.exports = router;
