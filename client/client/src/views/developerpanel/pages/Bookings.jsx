import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/developerpanel/developerbookings");
        console.log("Fetched bookings:", res.data);
        setBookings(res.data.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <p className="text-gray-600 text-lg">Loading bookings...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Updated Header */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0 text-center">
          Developer Bookings
        </h3>

        {bookings.length === 0 ? (
          <div className="text-gray-500 text-center text-lg font-medium mt-6">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl border border-gray-200 mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white uppercase text-sm">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Customer</th>
                  <th className="py-4 px-6 text-left font-semibold">Property</th>
                  <th className="py-4 px-6 text-left font-semibold">Amount</th>
                  <th className="py-4 px-6 text-left font-semibold">Payment</th>
                  <th className="py-4 px-6 text-left font-semibold">Status</th>
                  <th className="py-4 px-6 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="hover:bg-blue-50 transition-all duration-300 ease-in-out"
                  >
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-800">{b.customerName}</p>
                      <p className="text-gray-500 text-sm">{b.customerEmail}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {b.propertyId?.name || b.propertyId || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-gray-800 font-semibold">
                      ₹{b.amount}
                    </td>
                    <td
                      className={`py-4 px-6 font-semibold ${
                        b.paymentStatus === "Completed"
                          ? "text-green-600"
                          : b.paymentStatus === "Failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {b.paymentStatus}
                    </td>
                    <td
                      className={`py-4 px-6 font-semibold ${
                        b.bookingStatus === "Confirmed"
                          ? "text-green-600"
                          : b.bookingStatus === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {b.bookingStatus}
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Subtle Footer */}
        <div className="text-center text-gray-400 text-sm mt-10">
          © {new Date().getFullYear()} Edge Expert Developer Panel
        </div>
      </div>
    </div>
  );
};

export default Bookings;
