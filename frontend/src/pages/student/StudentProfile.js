import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const StudentProfile = () => {
  const [form, setForm] = useState({
    rollNumber: "",
    department: "",
    batch: "",
    cgpa: "",
    phone: "",
    skills: "",
    resumeUrl: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/me");
        if (data.studentProfile) {
          setForm({
            rollNumber: data.studentProfile.rollNumber || "",
            department: data.studentProfile.department || "",
            batch: data.studentProfile.batch || "",
            cgpa: data.studentProfile.cgpa || "",
            phone: data.studentProfile.phone || "",
            skills: (data.studentProfile.skills || []).join(", "),
            resumeUrl: data.studentProfile.resumeUrl || "",
            address: data.studentProfile.address || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };
      await API.put("/students/profile", payload);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 650 }}>
      <div className="card shadow-sm p-4">
        <h4 className="mb-4">Complete Your Profile</h4>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Roll Number</label>
              <input
                name="rollNumber"
                className="form-control"
                value={form.rollNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Department</label>
              <input
                name="department"
                className="form-control"
                value={form.department}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Batch (e.g. 2026)</label>
              <input
                name="batch"
                className="form-control"
                value={form.batch}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">CGPA</label>
              <input
                type="number"
                step="0.01"
                name="cgpa"
                className="form-control"
                value={form.cgpa}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                className="form-control"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Resume URL</label>
              <input
                name="resumeUrl"
                className="form-control"
                placeholder="Google Drive / Dropbox link"
                value={form.resumeUrl}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Skills (comma separated)</label>
              <input
                name="skills"
                className="form-control"
                placeholder="React, Node.js, MongoDB"
                value={form.skills}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                rows={2}
                value={form.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="btn btn-primary w-100">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
