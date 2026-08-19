import React, { useEffect, useState } from "react";
import API from "../../Api/axiosConfig";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/meetings")
      .then((res) => {
        setMeetings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch meetings:", err);
        setError("Failed to load meetings");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading meetings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Meetings</h2>
      <table className="w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Client</th>
            <th className="p-2 border">Property</th>
            <th className="p-2 border">Date/Time</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m._id} className="hover:bg-gray-50">
              <td className="p-2 border">{m.lead?.name || "N/A"}</td>
              <td className="p-2 border">{m.property?.title || "N/A"}</td>
              <td className="p-2 border">
                {new Date(m.datetime).toLocaleString()}
              </td>
              <td className="p-2 border">{m.location}</td>
              <td className="p-2 border">{m.notes}</td>
              <td className="p-2 border">{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Meetings;
