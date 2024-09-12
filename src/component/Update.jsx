import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  async function getSingleUser() {
    try {
      const response = await fetch(`http://localhost:4100/api/getByID/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to fetch user data");
        return;
      }

      setError("");
      setName(result.name || "");
      setEmail(result.email || "");
      setAge(result.age || 0);
    } catch (err) {
      setError("An error occurred while fetching user data");
    }
  }

  async function ChangeData(e) {
    e.preventDefault();

    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:4100/api/UpdateByID/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      setError(result.error);
      return;
    }

    if (response.ok) {
      setError("");
      navigate("/all");
    }
  }

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}

      <h2 className="text-center">Edit The Data</h2>

      <form on onSubmit={ChangeData}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
