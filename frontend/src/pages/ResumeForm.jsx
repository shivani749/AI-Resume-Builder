import { useState, useEffect } from "react";
import API, { updateResume } from "../services/api";

function ResumeForm({ editingResume, fetchResumes, clearEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    summary: "",
    degree: "",
    college: "",
    year: "",
  });

  const isEditing = editingResume !== null;
  const editingId = editingResume?._id;

  useEffect(() => {
    if (editingResume) {
      setFormData({
        name: editingResume.name,
        email: editingResume.email,
        skills: editingResume.skills.join(", "),
        experience: editingResume.experience,
        summary: editingResume.summary || "",
        degree: editingResume.education?.[0]?.degree || "",
        college: editingResume.education?.[0]?.college || "",
        year: editingResume.education?.[0]?.year || "",
      });
    }
  }, [editingResume]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateSummary = () => {
  let summary = "";

  const skills = formData.skills.toLowerCase();

  if (skills.includes("mern")) {
    summary =
      "Passionate MERN Stack Developer with experience in building full-stack web applications using MongoDB, Express.js, React.js and Node.js.";
  } else if (skills.includes("react")) {
    summary =
      "Frontend Developer skilled in React.js with experience in building responsive and user-friendly web applications.";
  } else {
    summary =
      `Passionate ${formData.skills} developer with strong problem-solving skills and a desire to learn new technologies.`;
  }

  setFormData({
    ...formData,
    summary,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingResume) {
        await updateResume(editingResume._id, {
          ...formData,
          skills: formData.skills.split(","),
        });

        alert("Resume updated successfully!");
        fetchResumes();
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          education: "",
          experience: "",
          summary: ""
        });

        clearEdit();

      } else {
        const response = await API.post("/", {
          ...formData,
          skills: formData.skills.split(","),
        });

        console.log(response.data);
        alert("Resume created successfully!");
        fetchResumes();
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          education: "",
          experience: "",
          summary: ""
        });
      }
    } catch (error) {
      console.log("Update error:", error.response?.data || error.message);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h1>Create Your Resume</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Enter your skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <textarea
          name="education"
          placeholder="Enter your education"
          value={formData.education}
          rows="4"
          onChange={handleChange}
        ></textarea>

        <textarea
          name="experience"
          placeholder="Enter your experience"
          value={formData.experience}
          rows="5"
          onChange={handleChange}
        ></textarea>
        <button type="button" 
        onClick={generateSummary} 
        className="ai-btn">
          Generate AI Summary</button>

        <textarea
          name="summary"
          placeholder="Enter professional summary"
          value={formData.summary}
          rows="4"
          onChange={handleChange}
        ></textarea>

        <button type="submit">{editingResume ? "Update Resume" : "Generate Resume"}
        </button>
      </form>
    </div>
  );
}

export default ResumeForm;