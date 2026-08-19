import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ApplyNow() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formRef = useRef(null);

  const openings = [
    { title: "Real Estate Sales Executive", location: "Pune", experience: "0 – 3 Years" },
    { title: "Channel Partner Manager", location: "Mumbai", experience: "2 – 5 Years" },
    { title: "Site Engineer", location: "Nagpur", experience: "1 – 4 Years" },
    { title: "Digital Marketing Executive", location: "Pune", experience: "1 – 3 Years" },
    { title: "CRM Executive", location: "Pune", experience: "0 – 2 Years" },

    { title: "Frontend Developer (React)", location: "Pune / Remote", experience: "1 – 3 Years" },
    { title: "Backend Developer (Node.js)", location: "Pune", experience: "1 – 4 Years" },
    { title: "Full Stack Developer", location: "Pune", experience: "2 – 5 Years" },
    { title: "Hardware Engineer", location: "Nagpur", experience: "0 – 3 Years" },
  ];

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const selectRole = (role) => {
    setForm((prev) => ({ ...prev, role }));
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setError("Please upload your resume");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("role", form.role);
      formData.append("message", form.message);
      formData.append("resume", resume);

      const res = await fetch("http://localhost:5000/api/apply-now/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Submission failed");
      }

      setSuccess("🎉 Application submitted successfully!");
      setForm({ name: "", email: "", phone: "", role: "", message: "" });
      setResume(null);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="h-[60vh] relative flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center text-white px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Build Your Career with Edge Expert
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-gray-200 text-lg">
            Join a fast-growing real estate & technology-driven organization.
          </p>
        </motion.div>
      </section>

      {/* ================= OPENINGS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">Current Openings</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openings.map((job, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold mb-3">{job.title}</h3>
                <p className="text-gray-600">📍 {job.location}</p>
                <p className="text-gray-600 mb-6">🕒 {job.experience}</p>

                <button
                  onClick={() => selectRole(job.title)}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      {showForm && (
        <section ref={formRef} className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-10"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Apply Now</h2>

              {success && <p className="mb-4 text-green-600 font-semibold text-center">{success}</p>}
              {error && <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Full Name"
                  required
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Email Address"
                  required
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  placeholder="Phone Number"
                  required
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />

                <select
                  name="role"
                  value={form.role}
                  required
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                >
                  <option value="">Select Job Role</option>
                  {openings.map((job, i) => (
                    <option key={i} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>

                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                  className="w-full p-4 border rounded-xl bg-white"
                />

                <textarea
                  name="message"
                  value={form.message}
                  rows="4"
                  placeholder="Why should we hire you?"
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Application 🚀"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
