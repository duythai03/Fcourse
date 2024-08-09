const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

CourseSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
