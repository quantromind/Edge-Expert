import React, { useEffect, useState } from "react";
import API from "../../../Api/axiosConfig";
import {
  Calendar,
  DollarSign,
  Briefcase,
  ClipboardList,
  FileText,
} from "lucide-react";

const Notifications = () => {
  const [notes, setNotes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [
        notesRes,
        bookingsRes,
        paymentsRes,
        meetingsRes,
        leadsRes,
        projectsRes,
      ] = await Promise.all([
        API.get("http://localhost:5000/api/developerpanel/developernotifications"),
        API.get("http://localhost:5000/api/developerpanel/developerbookings"),
        API.get("http://localhost:5000/api/developerpanel/developerpayments"),
        API.get("http://localhost:5000/api/developerpanel/developermeetings"),
        API.get("http://localhost:5000/api/developerpanel/developerleads"),
        API.get("http://localhost:5000/api/developerpanel/projects"),
      ]);

      setNotes(notesRes.data.data || []);
      setBookings(bookingsRes.data.data || []);
      setPayments(paymentsRes.data.data || []);
      setMeetings(meetingsRes.data.data || []);
      setLeads(leadsRes.data.data || []);
      setProjects(projectsRes.data.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch developer data");
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      const res = await API.put(`http://localhost:5000/api/developerpanel/developernotifications/${id}`);
      if (res.data.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
      }
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const markAllRead = async () => {
    try {
      const unreadIds = notes.filter((n) => !n.isRead).map((n) => n._id);
      await Promise.all(
        unreadIds.map((id) => API.put(`http://localhost:5000/api/developerpanel/developernotifications/${id}`))
      );
      setNotes((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  // 🔹 Reusable Section
  const Section = ({ title, icon: Icon, color, data, renderItem }) => (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-3 rounded-xl bg-${color}-100 text-${color}-600 shadow-sm`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="text-2xl font-bold text-gray-800 tracking-tight">
          {title}
        </h4>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No {title.toLowerCase()} found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div
                className={`absolute top-5 right-5 bg-${color}-50 p-2 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
              >
                <Icon
                  className={`w-6 h-6 text-${color}-600 transition-transform duration-500 group-hover:rotate-12`}
                />
              </div>

              <div className="mt-2 space-y-2 text-gray-700 dark:text-gray-200">
                {renderItem(item)}
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white to-${color}-100 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 🌀 Loading
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Loading Developer Dashboard...
        </h3>
        <p className="text-gray-500 animate-pulse">Fetching data...</p>
      </div>
    );

  // ⚠️ Error
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Developer Notifications
        </h3>
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  // ✅ Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 sm:p-10 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Developer Notifications & Updates
        </h3>
        {notes.some((n) => !n.isRead) && (
          <button
            onClick={markAllRead}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications */}
      <Section
        title="Notifications"
        icon={FileText}
        color="indigo"
        data={notes}
        renderItem={(n) => (
          <>
            <h4 className="text-lg font-semibold">{n.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {n.message}
            </p>
            <div className="flex justify-between text-xs text-gray-400 mt-3">
              <span>{n.developerId?.name || "Unknown"}</span>
              <span>{new Date(n.createdAt).toLocaleString()}</span>
            </div>
            {!n.isRead && (
              <button
                onClick={() => markRead(n._id)}
                className="mt-3 px-4 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300"
              >
                Mark as Read
              </button>
            )}
          </>
        )}
      />

      {/* Bookings */}
      <Section
        title="Bookings"
        icon={Calendar}
        color="blue"
        data={bookings}
        renderItem={(b) => (
          <>
            <p>
              <strong>Property:</strong> {b.propertyId?.name || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {b.status || "Pending"}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(b.createdAt).toLocaleString()}
            </p>
          </>
        )}
      />

      {/* Payments */}
      <Section
        title="Payments"
        icon={DollarSign}
        color="emerald"
        data={payments}
        renderItem={(p) => (
          <>
            <p>
              <strong>Amount:</strong> ₹{p.amount || "0"}
            </p>
            <p>
              <strong>Status:</strong> {p.status || "Pending"}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(p.createdAt).toLocaleString()}
            </p>
          </>
        )}
      />

      {/* Meetings */}
      <Section
        title="Meetings"
        icon={Briefcase}
        color="amber"
        data={meetings}
        renderItem={(m) => (
          <>
            <p>
              <strong>Title:</strong> {m.title || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {m.date ? new Date(m.date).toLocaleString() : "N/A"}
            </p>
          </>
        )}
      />

      {/* Leads */}
      <Section
        title="Leads"
        icon={ClipboardList}
        color="rose"
        data={leads}
        renderItem={(l) => (
          <>
            <p>
              <strong>Name:</strong> {l.name || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {l.status || "New"}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(l.createdAt).toLocaleString()}
            </p>
          </>
        )}
      />
    </div>
  );
};

export default Notifications;
