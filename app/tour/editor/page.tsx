"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, Video, Play, Save, X, LayoutGrid } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/Header";

interface Step {
  id: number;
  title: string;
  description: string;
  image?: string;
}

const ProductTourEditor = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState("New Tour");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/get-user");
        console.log("Fetch user response:", res);
        if (!res.ok) {
          toast.error("Unauthorized");
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUserId(data.id);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setMessage("Please log in to create a tour.");
      }
    };
    fetchUser();
  }, []);

  console.log(userId, steps, activeStep, isPreview, title, isPublic);

  const addStep = () => {
    const newStep: Step = {
      id: Date.now(),
      title: `Step ${steps.length + 1}`,
      description: "Add description here...",
    };
    setSteps([...steps, newStep]);
    setActiveStep(newStep.id);
  };

  const deleteStep = (id: number) => {
    setSteps(steps.filter((s) => s.id !== id));
    if (activeStep === id) setActiveStep(null);
  };

  const updateStep = (id: number, field: keyof Step, value: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          isPublic,
          userId,
          steps: steps.map((s, idx) => ({
            title: s.title,
            description: s.description,
            mediaUrl: s.image || null,
            order: idx + 1,
            tags: [],
            duration: null,
            interactive: {},
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save tour");
      }

      const data = await res.json();
      setMessage("Tour saved successfully!");
      console.log("Created tour:", data);
    } catch (err: any) {
      setMessage(err.message || "Error saving tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50 overflow-hidden text-black">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 border-r bg-white p-4 flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LayoutGrid size={18} /> Tour Steps
          </h2>
          <div className="flex-1 space-y-2 overflow-y-auto">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                layout
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-md border cursor-pointer transition ${
                  activeStep === step.id
                    ? "bg-blue-50 border-blue-400 shadow-sm"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm truncate">
                    {step.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStep(step.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={addStep}
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
          >
            <Plus size={16} /> Add Step
          </button>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 flex flex-col">
          {/* Tour Title + Public toggle */}
          <div className="p-4 border-b bg-white flex items-center gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border-b text-lg font-semibold focus:outline-none focus:border-blue-400"
              placeholder="Tour Title"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public
            </label>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center bg-gray-100 px-4">
            {activeStep ? (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
              >
                <input
                  type="text"
                  value={steps.find((s) => s.id === activeStep)?.title || ""}
                  onChange={(e) =>
                    updateStep(activeStep, "title", e.target.value)
                  }
                  className="w-full border-b text-xl font-semibold mb-4 focus:outline-none focus:border-blue-400"
                />
                <textarea
                  value={
                    steps.find((s) => s.id === activeStep)?.description || ""
                  }
                  onChange={(e) =>
                    updateStep(activeStep, "description", e.target.value)
                  }
                  className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows={4}
                />
                <div className="mt-4 h-52 flex items-center justify-center border rounded bg-gray-50 text-gray-400 text-sm overflow-hidden">
                  {steps.find((s) => s.id === activeStep)?.image ? (
                    <img
                      src={steps.find((s) => s.id === activeStep)?.image}
                      alt="Step"
                      className="h-full object-contain"
                    />
                  ) : (
                    "Upload screenshot or record screen"
                  )}
                </div>
              </motion.div>
            ) : (
              <p className="text-gray-500 text-center">
                Select or add a step to begin editing
              </p>
            )}
          </div>

          {/* Toolbar */}
          <div className="border-t bg-white p-3 flex justify-between items-center sticky bottom-0">
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition">
                <Upload size={16} /> Upload
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition">
                <Video size={16} /> Record
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPreview(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <Play size={16} /> Preview
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
              >
                <Save size={16} /> {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
          {message && (
            <p className="text-center py-2 text-sm text-gray-600">{message}</p>
          )}
        </main>

        {/* Preview Modal */}
        <AnimatePresence>
          {isPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 w-full max-w-3xl relative shadow-2xl"
              >
                <button
                  onClick={() => setIsPreview(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                  <X size={22} />
                </button>
                <h2 className="text-xl font-bold mb-6">Tour Preview</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="p-4 border rounded-md bg-gray-50 shadow-sm"
                    >
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductTourEditor;
