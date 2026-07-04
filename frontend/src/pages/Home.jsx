import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumeCard from "../components/ResumeCard";
import { getResumes, deleteResume } from "../services/api";
import ResumeForm from "./ResumeForm";

function Home() {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [editingResume, setEditingResume] = useState(null);

  const navigate = useNavigate();


  const fetchResumes = async () => {
    try {
      const response = await getResumes();

      // Backend se aane wala data set karenge
      console.log(response.data);
      setResumes(response.data.resumes);

    } catch (error) {
      console.log("Error fetching resumes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      fetchResumes();
    } catch (error) {
      console.log("Error deleting resume:", error);
    }
  };
  const handleEdit = (resume) => {
    setEditingResume(resume);
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  };

  const clearEdit = () => {
    setEditingResume(null);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    else {
      fetchResumes();
    }

  }, []);

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="hero">
        <h1>🤖 AI Resume Builder</h1>
        <p>Create professional and ATS-friendly resumes in minutes.</p>

        <button
          className="hero-btn"
          onClick={() =>
            document.querySelector(".form-container")?.scrollIntoView({behavior: "smooth"})
          }
        >
          Create Resume
        </button>
      </div>
      <div className="stats">
        <div className="stat-card" 
        onClick={()=> document
        .querySelector(".resume-grid")
        ?.scrollIntoView({ behavior: "smooth"})}>
          <h2>{resumes.length}+</h2>
          <p>Resumes Created</p>
        </div>

        <div className="stat-card">
          <h2>ATS</h2>
          <p>Friendly Templates</p>
        </div>

        <div className="stat-card">
          <h2>AI</h2>
          <p>Summary Generator</p>
        </div>
      </div>
      <div className="features">
        <div className="feature-card"
          onClick={() => document
            .querySelector(".form-container")
            ?.scrollIntoView({ behavior: "smooth" })
          }>🤖 AI Summary</div>
        <div className="feature-card"
          onClick={document
            .querySelector(".resume-grid")
            ?.scrollIntoView({ behavior: "smooth" })
          }>📄 PDF Download</div>
        <div className="feature-card"
          onClick={() => document
            .querySelector(".search-box")
            ?.focus()}>🔍 Search Resume</div>
      </div>
      <ResumeForm editingResume={editingResume}
        fetchResumes={fetchResumes}
        clearEdit={clearEdit} />
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Resume by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>
      <h2>All Resumes({resumes.length})</h2>

      <div className="resume-grid">
        {resumes.length > 0 ? (
          resumes
            .filter((resume) =>
              resume.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
        ) : (
          <p>No resumes found</p>
        )}
      </div>
    </div>
  );
}

export default Home;