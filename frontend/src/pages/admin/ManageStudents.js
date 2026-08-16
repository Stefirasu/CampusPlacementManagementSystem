import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const { data } = await API.get("/admin/students");
      setStudents(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await API.put(`/admin/students/${id}/toggle-status`);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student permanently?")) return;
    try {
      await API.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Manage Students</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered bg-white shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>CGPA</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.studentProfile?.department}</td>
              <td>{s.studentProfile?.cgpa}</td>
              <td>
                <span className={`badge bg-${s.isActive ? "success" : "secondary"}`}>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-warning" onClick={() => toggleStatus(s._id)}>
                    {s.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => deleteStudent(s._id)}>
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

export default ManageStudents;
