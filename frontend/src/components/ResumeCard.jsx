import jsPDF from "jspdf";
import html2canvas from "html2canvas";
function ResumeCard({ resume, handleDelete, handleEdit }) {
  const downloadPDF = async () => {
  const input = document.getElementById(`resume-${resume._id}`);

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  const imgWidth = 190;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  pdf.save(`${resume.name}-resume.pdf`);
};
  return (
    <div className="resume-card"  id={`resume-${resume._id}`}>
      <h3>{resume.name}</h3>
      <p><strong>Email:</strong>{resume.email}</p>
      <p><strong>Phone:</strong> {resume.phone}</p>
      <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
      <p><strong>Education:</strong> {resume.education}</p>
      <p><strong>Experience:</strong> {resume.experience}</p>
      <p><strong>Summary:</strong> {resume.summary}</p>
      <div className="btn-group">      
      <button className="edit-btn" onClick={()=> handleEdit(resume)}>Edit</button>
      <button className="delete-btn" onClick={() => handleDelete(resume._id)}>delete</button>
      <button className="pdf-btn" onClick={downloadPDF}>Download PDF</button>
      </div>

    </div>
  );
}

export default ResumeCard;