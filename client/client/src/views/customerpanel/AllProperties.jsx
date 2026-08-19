import React, { useEffect, useState } from "react";
import API from "../../Api/axiosConfig"; // this already has baseURL + token

export default function AllProperties() {
  const [commercial, setCommercial] = useState([]);
  const [sell, setSell] = useState([]);
  const [rent, setRent] = useState([]);

  useEffect(() => {
    fetchCommercial();
    fetchSell();
    fetchRent();
  }, []);

  // ==========================
  // Fetch Commercial Properties
  // ==========================
  const fetchCommercial = async () => {
    try {
      const res = await API.get("/commercialproperties"); 
      setCommercial(res.data.data || []);
    } catch (err) {
      console.error("❌ Commercial Fetch Error:", err);
    }
  };

  // ==========================
  // Fetch Properties for Sale
  // ==========================
  const fetchSell = async () => {
    try {
      const res = await API.get("/sellproperty");  
      setSell(res.data.data || []);
    } catch (err) {
      console.error("❌ Sell Fetch Error:", err);
    }
  };

  // ==========================
  // Fetch Rental Properties
  // ==========================
  const fetchRent = async () => {
    try {
      const res = await API.get("/rentproperties"); 
      setRent(res.data.data || []);
    } catch (err) {
      console.error("❌ Rent Fetch Error:", err);
    }
  };

  return (
    <div className="container py-5">

      {/* ================================
          COMMERCIAL PROPERTIES
      ================================= */}
      <h2 className="fw-bold mb-3">Commercial Properties</h2>
      <div className="row mb-4">
        {commercial.length === 0 && (
          <p className="text-muted">No commercial properties found.</p>
        )}

        {commercial.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card shadow mb-3">
              <img
                src={p.images?.[0] || p.image}
                className="card-img-top"
                alt="property"
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.location}</p>
                <p className="fw-bold">{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================================
          PROPERTIES FOR SALE
      ================================= */}
      <h2 className="fw-bold mb-3">Properties for Sale</h2>
      <div className="row mb-4">
        {sell.length === 0 && (
          <p className="text-muted">No sale properties found.</p>
        )}

        {sell.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card shadow mb-3">
              <img
                src={p.images?.[0] || p.image}
                className="card-img-top"
                alt="property"
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.location}</p>
                <p className="fw-bold">{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================================
          RENTAL PROPERTIES
      ================================= */}
      <h2 className="fw-bold mb-3">Properties for Rent</h2>
      <div className="row">
        {rent.length === 0 && (
          <p className="text-muted">No rental properties found.</p>
        )}

        {rent.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div className="card shadow mb-3">
              <img
                src={p.images?.[0] || p.image}
                className="card-img-top"
                alt="property"
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.location}</p>
                <p className="fw-bold">{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
