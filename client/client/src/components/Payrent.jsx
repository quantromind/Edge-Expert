import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, User, Calendar, DollarSign, Home, MapPin, CreditCard as CardIcon, FileText } from "lucide-react";

const PayRent = () => {
  const [tenantName, setTenantName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handlePayment = () => {
    if (!tenantName || !propertyAddress || !amount || !dueDate || !paymentMethod) {
      alert("Please fill all required details!");
      return;
    }

    alert(
      `Payment of ₹${amount} for ${tenantName} (${propertyAddress}) via ${paymentMethod} is successful!`
    );

    setTenantName("");
    setPropertyAddress("");
    setAmount("");
    setDueDate("");
    setPaymentMethod("");
    setNotes("");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-8"
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center justify-center">
          <Home className="w-7 h-7 text-blue-600 mr-2" /> Pay Your Rent
        </h2>
        <p className="text-gray-600 mb-6 text-center text-sm">
          Secure and hassle-free rent payment for your property.
        </p>

        {/* Tenant Name */}
        <div className="flex items-center mb-4 border border-gray-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <User className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Tenant Name"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm bg-transparent"
          />
        </div>

        {/* Property Address */}
        <div className="flex items-center mb-4 border border-gray-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Property Address"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm bg-transparent"
          />
        </div>

        {/* Amount */}
        <div className="flex items-center mb-4 border border-gray-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm bg-transparent"
          />
        </div>

        {/* Due Date */}
        <div className="flex items-center mb-4 border border-gray-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="date"
            min={today}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm bg-transparent"
          />
        </div>

        {/* Payment Method */}
        <div className="flex items-center mb-4 border border-gray-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <CardIcon className="w-5 h-5 text-gray-400 mr-2" />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm bg-transparent"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit/Debit Card">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Notes */}
        <div className="flex items-center mb-6 border border-gray-200 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 bg-white">
          <FileText className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full outline-none text-gray-700 text-sm bg-transparent"
          />
        </div>

        {/* Pay Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all"
        >
          Pay Now
        </motion.button>

        {/* Footer Info */}
        <div className="mt-6 text-gray-500 text-xs text-center">
          <CreditCard className="inline w-4 h-4 mr-1" /> 100% Secure Payment
          Gateway
        </div>
      </motion.div>
    </div>
  );
};

export default PayRent;
