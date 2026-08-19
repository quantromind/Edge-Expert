import React, { useEffect, useState } from "react";
import API from "../../../Api/axiosConfig";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("http://localhost:5000/api/developerpanel/developerleads");
      setLeads(res.data.data || res.data || []);
    } catch (err) {
      console.error("❌ Leads fetch error:", err);
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  // Function to render colored status badges
  const renderStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-sm font-semibold inline-block";
    switch (status) {
      case "New":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{status}</span>;
      case "Contacted":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
      case "Interested":
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>{status}</span>;
      case "Not Interested":
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>{status}</span>;
      case "Closed":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">
          Developer Leads
        </h3>
        <p className="text-gray-500">
          Total Leads: {leads.length}
        </p>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-10">Loading leads...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : leads.length === 0 ? (
        <div className="text-gray-400 text-center py-10 text-lg">
          No leads found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-left">
              <tr>
                <th className="py-3 px-6 text-sm font-medium">#</th>
                <th className="py-3 px-6 text-sm font-medium">Name</th>
                <th className="py-3 px-6 text-sm font-medium">Email</th>
                <th className="py-3 px-6 text-sm font-medium">Phone</th>
                <th className="py-3 px-6 text-sm font-medium">Property</th>
                <th className="py-3 px-6 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead, idx) => (
                <tr
                  key={lead._id}
                  className="hover:bg-blue-50 transition duration-200"
                >
                  <td className="py-4 px-6">{idx + 1}</td>
                  <td className="py-4 px-6 font-medium text-gray-800">{lead.name}</td>
                  <td className="py-4 px-6 text-gray-600">{lead.email}</td>
                  <td className="py-4 px-6 text-gray-600">{lead.phone}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {lead.propertyId?.name || "—"}
                  </td>
                  <td className="py-4 px-6">
                    {renderStatusBadge(lead.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leads;
