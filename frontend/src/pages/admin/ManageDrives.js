import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageDrives = () => {
  const [drives, setDrives] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", driveDate: "", venue: "", description: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [d, c] = await Promise.all([API.get("/admin/drives"), API.get("/admin/companies")]);
      setDrives(d.data);
      setCompanies(c.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createDrive = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await API.post("/admin/drives", form);
      setMessage("Drive scheduled successfully");
      setForm({ title: "", company: "", driveDate: "", venue: "", description: "" });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule drive");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/drives/${id}`, { status });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update drive");
    }
  };

  const deleteDrive = async (id) => {
    if (!window.confirm("Delete this drive?")) return;
    try {
      await API.delete(`/admin/drives/${id}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete drive");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Manage Placement Drives</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <div className="card shadow-sm p-3 mb-4">
        <form onSubmit={createDrive} className="row g-2">
          <div className="col-md-3">
            <input name="title" className="form-control" placeholder="Drive Title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <select name="company" className="form-select" value={form.company} onChange={handleChange}>
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input type="date" name="driveDate" className="form-control" value={form.driveDate} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input name="venue" className="form-control" placeholder="Venue" value={form.venue} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">Schedule</button>
          </div>
        </form>
      </div>

      <table className="table table-bordered bg-white shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((d) => (
            <tr key={d._id}>
              <td>{d.title}</td>
              <td>{d.company?.name}</td>
              <td>{new Date(d.driveDate).toLocaleDateString()}</td>
              <td>{d.venue}</td>
              <td>{d.status}</td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-success" onClick={() => updateStatus(d._id, "Completed")}>
                    Mark Completed
                  </button>
                  <button className="btn btn-outline-warning" onClick={() => updateStatus(d._id, "Cancelled")}>
                    Cancel
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => deleteDrive(d._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDrives;
