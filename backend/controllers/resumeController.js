const Resume = require("../models/Resume");

//Create Resume
const createResume = async (req, res)=>{
    try{
        const resume = await Resume.create(req.body);
        res.status(201).json({
            success: true,
            message: "Resume created successfully",
            resume,
        });
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Get All Resume
const getAllResume = async (req, res) => {
  try {
    const resumes = await Resume.find();

    res.status(200).json({
      success: true,
      resumes,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




//Get Single Resume
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        res.status(200).json({
            success: true,
            resume,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Resume
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            resume,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Resume
const deleteResume = async (req, res) => {
    try {
        await Resume.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
  createResume,
  getAllResume,
  getResumeById,
  updateResume,
  deleteResume,
}