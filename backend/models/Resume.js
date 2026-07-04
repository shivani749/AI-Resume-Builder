const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,

    skills: [
      {
        type: String,
      },
    ],

    education: String,

    experience: String,
      

    summary: String,
  address: String,

projects: [
  {
    title: String,
    description: String,
  },
],

linkedin: String,

github: String,

template: {
  type: String,
  default: "simple",
},
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);