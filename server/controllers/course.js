const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  const course = await Course.create({
    title,
    description,
    price,
    thumbnail: req.file
      ? `/uploads/courses/${req.file.filename}`
      : ""
  });

  res.json(course);
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};
