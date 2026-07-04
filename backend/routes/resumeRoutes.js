const express = require("express");


const {
  createResume,
  getAllResume,
  getResumeById,
  updateResume,
  deleteResume
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/", createResume);

router.get("/", getAllResume);

router.get("/:id", getResumeById);

router.put("/:id", updateResume);

router.delete("/:id", deleteResume);

module.exports = router;