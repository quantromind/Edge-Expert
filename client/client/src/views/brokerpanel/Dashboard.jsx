// src/components/BrokerPanel/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../../Api/axiosConfig";
import { Home, Building2, Users, Calendar, Award } from "lucide-react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProperties: 0,
    newProperties: 0,
    customerLeads: 0,
    dealsClosed: 0,
    plan: "Free",
  });

  const [loading, setLoading] = useState(true);

  // Fetch dashboard data with polling
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("/broker/dashboard");
        const data = res.data;

        setDashboardData({
          totalProperties: data.totalProperties || 0,
          newProperties: data.newProperties || 0,
          customerLeads: data.customerLeads || 0,
          dealsClosed: data.dealsClosed || 0,
          plan: data.plan || "Free",
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      }
    };

    fetchDashboardData(); // initial fetch

    const interval = setInterval(fetchDashboardData, 10000); // refresh every 10s
    return () => clearInterval(interval); // cleanup
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const CARDS = [
    { title: "Total Properties", count: dashboardData.totalProperties, icon: Home },
    { title: "New Listings", count: dashboardData.newProperties, icon: Building2 },
    { title: "Customer Leads", count: dashboardData.customerLeads, icon: Users },
    { title: "Deals Closed", count: dashboardData.dealsClosed, icon: Calendar },
    { title: "Your Plan", count: dashboardData.plan, icon: Award },
  ];

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-gray-700">Broker Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white p-4 rounded shadow flex flex-col justify-between border-l-4 border-teal-500 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <Icon className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{card.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
