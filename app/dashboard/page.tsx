"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, BarChart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

interface Tour {
  id: number;
  title: string;
  status: "Public" | "Private";
  thumbnail?: string;
}

const DashboardPage = () => {
  const [tours, setTours] = useState<Tour[]>([
    {
      id: 1,
      title: "Onboarding Flow",
      status: "Public",
      thumbnail: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Payment Demo",
      status: "Private",
      thumbnail: "https://via.placeholder.com/300x200",
    },
  ]);

  const deleteTour = (id: number) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="border-b bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Tours</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            <Plus size={16} /> New Tour
          </button>
        </div>

        {/* Tours Grid */}
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow hover:shadow-md transition border"
            >
              {/* Thumbnail */}
              <div className="h-40 w-full overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
                {tour.thumbnail ? (
                  <img
                    src={tour.thumbnail}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Preview</span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-lg">{tour.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full w-fit ${
                    tour.status === "Public"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tour.status}
                </span>

                {/* Actions */}
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                      <Eye size={16} /> View
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm">
                      <Edit size={16} /> Edit
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm">
                      <BarChart size={16} /> Analytics
                    </button>
                    <button
                      onClick={() => deleteTour(tour.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
