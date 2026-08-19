import React, { useEffect, useState } from "react";
import API from "../../../Api/axiosConfig";
import TableView from "../components/TableView";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await API.get("http://localhost:5000/api/developerpanel/developermeetings");
      setMeetings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching meetings:", err);
      setError("Failed to load meetings from backend");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Table columns
  const columns = [
    { header: "#", accessor: (r) => r._id?.slice(-6) },
    { header: "Lead", accessor: (r) => r.leadId?.name || "—" },
    { header: "Property", accessor: (r) => r.propertyId?.name || "—" },
    { header: "Date", accessor: (r) => new Date(r.meetingDate).toLocaleString() },
    { header: "Mode", accessor: "meetingMode" },
    {
      header: "Status",
      accessor: (r) => {
        const statusColors = {
          Scheduled: "bg-yellow-200 text-yellow-800",
          Completed: "bg-green-200 text-green-800",
          Cancelled: "bg-red-200 text-red-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              statusColors[r.status] || "bg-gray-200 text-gray-800"
            }`}
          >
            {r.status}
          </span>
        );
      },
    },
  ];

  // ✅ Search filter logic
  const filteredMeetings = meetings.filter((m) =>
    m.leadId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-6">
      {/* 🌟 Page Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Developer Meetings
        </h1>
        <p className="text-gray-500 text-lg">
          Manage and track all your scheduled, completed, and cancelled meetings in one place.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Lead name..."
          className="w-full md:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧾 Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]">
        {loading ? (
          <div className="text-center text-gray-500 py-10 animate-pulse">
            Loading meetings...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : filteredMeetings.length === 0 ? (
          <div className="text-gray-500 text-center py-10">
            No meetings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <TableView columns={columns} data={filteredMeetings} />
          </div>
        )}
      </div>

      {/* ✨ Footer Section */}
      <div className="text-center mt-10 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Edge Expert Developer Panel</p>
      </div>
    </div>
  );
};

export default Meetings;
