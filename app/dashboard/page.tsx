"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ViewTourDialog from "@/components/tours/ViewTourDialog";
import EditTourDialog from "@/components/tours/EditTourDialog";
import DeleteTourDialog from "@/components/tours/DeleteTourDialog";

interface Step {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  order: number;
}

interface Tour {
  id: string;
  title: string;
  status: "Public" | "Private";
  thumbnail?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  stepsCount?: number;
  steps?: Step[];
  user?: { id: string; email: string };
}

const DashboardPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTours, setLoadingTours] = useState(false);

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [editTour, setEditTour] = useState<Tour | null>(null);
  const [editOpen, setEditOpen] = useState(false);

useEffect(() => {
  const fetchUser = async () => {
    setLoadingUser(true);
    try {
      const res = await fetch("/api/auth/get-user");
      if (!res.ok) throw new Error("Not logged in");
      const data = await res.json();
      setUserId(data.user.id);
    } catch {
      toast.error("Please log in to create a tour.");
    } finally {
      setLoadingUser(false);
    }
  };
  fetchUser();
}, []);

useEffect(() => {
  const fetchTours = async () => {
    if (!userId) return;
    setLoadingTours(true);
    try {
      const res = await fetch(`/api/tours/get-tours/${userId}`);
      if (!res.ok) throw new Error("Not logged in");
      const data = await res.json();
      setTours(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Please log in to create a tour.");
    } finally {
      setLoadingTours(false);
    }
  };
  fetchTours();
}, [userId]);

  const deleteTour = async (id: string) => {
    try {
      const res = await fetch(`/api/tours/delete-tour/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setTours((prev) => prev.filter((tour) => tour.id !== id));
      toast.success("Tour deleted successfully");
    } catch {
      toast.error("Failed to delete tour");
    }
  };

  const handleViewTour = async (tour: Tour) => {
    try {
      const res = await fetch(`/api/tours/get-tours/${userId}/${tour.id}`);
      if (!res.ok) throw new Error("Failed to fetch tour details");
      const data = await res.json();
      setSelectedTour(data);
      setViewOpen(true);
    } catch {
      toast.error("Failed to load tour details");
    }
  };

  const handleEditTour = async (tour: Tour) => {
    try {
      const res = await fetch(`/api/tours/get-tours/${userId}/${tour.id}`);
      if (!res.ok) throw new Error("Failed to fetch tour details");
      const data = await res.json();
      setEditTour(data);
      setEditOpen(true);
    } catch {
      toast.error("Failed to load tour for editing");
    }
  };

  const handleUpdate = async (updatedTour: Tour) => {
    try {
      const res = await fetch(`/api/tours/update-tour/${updatedTour.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedTour.title,
          isPublic: updatedTour.status === "Public",
          steps: updatedTour.steps,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setTours((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

      toast.success("Tour updated successfully");
      setEditOpen(false);
    } catch {
      toast.error("Failed to update tour");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Tours Grid */}
        <div className="max-w-7xl mx-auto p-6">
          {loadingUser || loadingTours ? (
            // Skeleton Loader
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tours.length === 0 ? (
            // Empty State
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No tours found.</p>
              <p className="text-sm">
                Click “<Link href="/tour/editor">New Tour</Link>” to create your
                first tour.
              </p>
            </div>
          ) : (
            // Tours List
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden group"
                >
                  {/* Thumbnail */}
                  <div className="h-48 w-full relative overflow-hidden">
                    {tour.thumbnail ? (
                      <img
                        src={tour.thumbnail}
                        alt={tour.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Preview
                      </div>
                    )}
                    <span
                      className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full shadow ${
                        tour.status === "Public"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl text-gray-800 line-clamp-1">
                      {tour.title}
                    </h2>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleViewTour(tour)}
                        >
                          <Eye size={16} /> View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleEditTour(tour)}
                        >
                          <Edit size={16} /> Edit
                        </Button>
                      </div>
                      <DeleteTourDialog
                        tourId={tour.id}
                        tourTitle={tour.title}
                        onDelete={deleteTour}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ViewTourDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        tour={selectedTour}
      />

      <EditTourDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        tour={editTour}
        onSave={handleUpdate}
      />
    </>
  );
};

export default DashboardPage;
