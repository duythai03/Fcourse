const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
class CoursesController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // Get /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // Get /courses/:_id/edit
  edit(req, res, next) {
    Course.findById(req.params._id)
      .then((course) => {
        res.render("courses/edit", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // Put /courses/:_id
  update(req, res, next) {
    Course.updateOne({ _id: req.params._id }, req.body) // req.body: dữ liệu mới
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // Delete /courses/:_id
  delete(req, res, next) {
    Course.deleteOne({ _id: req.params._id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // Post /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    console.log(formData.image);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch(next);
  }
}
module.exports = new CoursesController();
