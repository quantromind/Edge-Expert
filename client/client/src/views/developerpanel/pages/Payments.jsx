import React, { useEffect, useState } from "react";
import API from "../../../Api/axiosConfig";
import TableView from "../components/TableView";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get("http://localhost:5000/api/developerpanel/developerPayments");
      setPayments(res.data.data || res.data || []);
    } catch (err) {
      console.error("Payments fetch:", err);
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Txn ID", accessor: "transactionId" },
    { header: "Booking", accessor: (r) => r.bookingId?._id || "—" },
    { header: "Amount", accessor: (r) => `₹ ${r.amount}` },
    { header: "Method", accessor: "paymentMethod" },
    { header: "Date", accessor: (r) => new Date(r.paymentDate).toLocaleDateString() },
    {
      header: "Status",
      accessor: (r) => {
        const statusColors = {
          Pending: "bg-yellow-100 text-yellow-800",
          Completed: "bg-green-100 text-green-800",
          Failed: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              statusColors[r.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {r.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ✅ Updated Heading for consistency */}
      <h3 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0 text-center">
        Developer Payments
      </h3>

      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto mt-6">
        {loading ? (
          <div className="text-gray-500 text-center py-10">Loading payments...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : payments.length === 0 ? (
          <div className="text-gray-500 text-center py-10">No payments found.</div>
        ) : (
          <TableView columns={columns} data={payments} />
        )}
      </div>
    </div>
  );
};

export default Payments;
