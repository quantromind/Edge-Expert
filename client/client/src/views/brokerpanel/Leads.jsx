import React, { useEffect, useState } from "react";
import API from "../../Api/axiosConfig";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/leads")
      .then((res) => {
        // Your backend likely returns an array of leads
        setLeads(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leads:", err);
        setError("Failed to load leads");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Leads</h2>
      <table className="w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50">
              <td className="p-2 border">{lead.name}</td>
              <td className="p-2 border">{lead.status}</td>
              <td className="p-2 border">{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leads;
