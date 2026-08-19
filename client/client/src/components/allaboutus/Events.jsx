import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CalendarDays } from "lucide-react";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ================= UPCOMING EVENTS ================= */
  const upcomingEvents = [
    {
      id: 1,
      title: "Luxury Villa Launch",
      date: "25 Dec 2024",
      location: "Pune",
      image:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc:
        "Exclusive launch of premium luxury villas featuring modern architecture, private gardens, and world-class amenities.",
    },
    {
      id: 2,
      title: "Real Estate Investor Meetup",
      date: "10 Jan 2025",
      location: "Mumbai",
      image:
        "https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc:
        "Connect with top investors, developers, and industry experts to explore high-return property investments.",
    },
    {
      id: 3,
      title: "Smart Homes Expo 2025",
      date: "5 Feb 2025",
      location: "Bangalore",
      image:
        "https://images.pexels.com/photos/3637726/pexels-photo-3637726.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc:
        "Discover next-gen smart homes, automation solutions, and sustainable living innovations.",
    },
  ];

  /* ================= PAST EVENTS ================= */
  const pastEvents = [
    {
      id: 101,
      title: "Edge Expert Property Expo 2024",
      date: "12 Aug 2024",
      location: "Nagpur",
      image:
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 102,
      title: "Commercial Realty Meetup",
      date: "5 Jun 2024",
      location: "Mumbai",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 103,
      title: "Luxury Homes Showcase",
      date: "20 Mar 2024",
      location: "Pune",
      image:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* ================= HERO ================= */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-6 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Premium Real Estate Events
          </h1>

          <p className="text-gray-200 mt-5 text-lg">
            Discover luxury property launches, investor meetups, and exclusive
            real estate expos by Edge Expert.
          </p>

          <div className="mt-10">
            <button
              onClick={() =>
                document
                  .getElementById("upcoming-events")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Explore Events
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================= UPCOMING EVENTS ================= */}
      <div
        id="upcoming-events"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold">{event.title}</h3>

                <div className="flex gap-4 text-gray-600 text-sm mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={16} /> {event.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= PAST EVENTS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Past Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden grayscale hover:grayscale-0 transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold">{event.title}</h3>

                <div className="flex gap-4 text-gray-600 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={16} /> {event.date}
                  </span>
                </div>

                <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-gray-200">
                  Completed
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-xl w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-60 object-cover rounded-2xl mb-5"
              />

              <h2 className="text-2xl font-bold">
                {selectedEvent.title}
              </h2>

              <p className="mt-4 text-gray-700">
                {selectedEvent.desc}
              </p>

              <button className="mt-6 w-full bg-black text-white py-3 rounded-xl">
                Register Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
