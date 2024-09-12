import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setEroor] = useState();

  async function getData() {
    const response = await fetch("http://localhost:4100/api/showUsers");
    const result = await response.json();

    if (!response.ok) {
      setEroor(result.error.error);
    }
    if (response.ok) {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4100/api/DeleteByID/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setEroor(result.error);
    }
    if (response.ok) {
      setEroor("");
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="container my-2">
      <h2 className="text-center">All data</h2>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="text-muted">{ele.age}</p>
                <a
                  href="#"
                  className="card-link"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </a>
                <Link to={`/${ele._id}`} className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
