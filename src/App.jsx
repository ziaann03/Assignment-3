import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">PeopleDesk</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/employee-form">Employee Form</Link>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load employee data.');
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load data. Please check your internet connection and refresh.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="container page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DASHBOARD</p>
          <h1>PeopleDesk</h1>
          <p className="subtitle">Clean blue dashboard with a compact employee table.</p>
        </div>
        <div className="count-box">
          <span className="count-number">{employees.length}</span>
          <span className="count-label">Employees</span>
        </div>
      </div>

      {loading && <p className="message">Loading employees...</p>}
      {error && <p className="alert alert-danger">{error}</p>}

      {!loading && !error && (
        <section className="employee-area">
          <div className="table-responsive">
            <table className="table employee-table align-middle">
              <thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td className="employee-name">{employee.name}</td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '', designation: '', location: '', salary: ''
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="container page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EMPLOYEE DETAILS</p>
          <h1>Employee Form</h1>
          <p className="subtitle">Enter the employee information below.</p>
        </div>
      </div>
      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="designation">Designation</label>
          <input className="form-control" id="designation" name="designation" value={formData.designation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="location">Location</label>
          <input className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="salary">Salary</label>
          <input className="form-control" id="salary" name="salary" type="number" min="0" value={formData.salary} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary-custom" type="submit">Submit Employee</button>
        {submitted && <div className="alert alert-success mt-3 mb-0">Form submitted successfully (demo only).</div>}
      </form>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="footer">Simple Employee Dashboard · React</footer>
    </>
  );
}
