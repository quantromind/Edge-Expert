import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/properties";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    rent: "",
    price: "",
    type: "Flat",
  });
  const [images, setImages] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProperties(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      images.forEach((img) => data.append("images", img));

      await axios.post(API_URL, data);
      alert("Property Added Successfully");

      setForm({
        title: "",
        location: "",
        description: "",
        rent: "",
        price: "",
        type: "Flat",
      });
      setImages([]);
      fetchProperties();
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data || err);
      alert("Error adding property");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✅ FIXED useEffect (NO implicit return)
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (mounted) {
        await fetchProperties();
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Add Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
          <input name="rent" value={form.rent} onChange={handleChange} placeholder="Rent" className="w-full border p-2 rounded" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" />
          <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
            <option>Flat</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Office</option>
          </select>
          <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Property</button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Properties</h2>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <div key={p._id} className="bg-white shadow rounded-xl p-4">
              <h3 className="font-bold text-lg">{p.title}</h3>
               
              <p>{p.location}</p>
              <p>{p.type}</p>

              <img
  src={
    Array.isArray(p.images) && p.images.length > 0
      ? `http://localhost:5000${p.images[0]}`
      : "https://via.placeholder.com/400x300?text=No+Image"
  }
  alt={p.title}
  className="h-48 w-full object-cover rounded"
/>

              <div className="flex justify-between mt-3">
                <span className="text-green-600 font-semibold">₹ {p.rent}</span>
                <span className="text-blue-600 font-semibold">₹ {p.price}</span>
              </div>
              <button onClick={() => deleteProperty(p._id)} className="mt-4 bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
