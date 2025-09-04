"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Play, Save, X, LayoutGrid } from "lucide-react";
import { UploadButton } from "@uploadthing/react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// ⬇️ Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Step {
  id: number;
  title: string;
  description: string;
  mediaUrl?: string | null;
}

const ProductTourEditor = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [title, setTitle] = useState("New Tour");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/get-user");
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUserId(data.user.id);
      } catch {
        toast.error("Please log in to create a tour.");
      }
    };
    fetchUser();
  }, []);

  const activeStepObj = useMemo(
    () => steps.find((s) => s.id === activeStep) || null,
    [activeStep, steps]
  );

  const addStep = () => {
    const newStep: Step = {
      id: Date.now(),
      title: `Step ${steps.length + 1}`,
      description: "",
    };
    setSteps((prev) => [...prev, newStep]);
    setActiveStep(newStep.id);
  };

  const updateStep = (id: number, field: keyof Step, value: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const deleteStep = (id: number) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
    if (activeStep === id) setActiveStep(null);
  };

  const handleSave = async () => {
    if (!userId) return toast.error("User not found");
    setLoading(true);
    try {
      const res = await fetch("/api/tours/create-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          isPublic,
          userId,
          steps: steps.map((s, i) => ({
            ...s,
            order: i + 1,
            tags: [],
            duration: null,
            interactive: {},
          })),
        }),
      });
      if (!res.ok) throw new Error("Failed to save tour");
      toast.success("Tour saved successfully!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (res: { ufsUrl: string }[] | undefined) => {
    if (activeStep && res?.[0]) {
      updateStep(activeStep, "mediaUrl", res[0].ufsUrl);
      toast.success("Screenshot uploaded!");
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-black">
        {/* Sidebar */}
        <aside className="hidden md:flex w-72 border-r bg-white/90 backdrop-blur-sm p-4 flex-col shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <LayoutGrid size={18} /> Steps
          </h2>
          <ScrollArea className="flex-1 pr-1">
            <div className="space-y-2">
              {steps.map((s) => (
                <Card
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`cursor-pointer transition ${
                    activeStep === s.id
                      ? "border-blue-400 shadow-md bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <CardContent className="flex items-center gap-2 p-3">
                    {s.mediaUrl && (
                      <img
                        src={s.mediaUrl}
                        alt={s.title}
                        className="w-10 h-10 object-cover rounded-md border"
                      />
                    )}
                    <div className="flex-1 truncate text-sm font-medium text-gray-700">
                      {s.title}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStep(s.id);
                      }}
                      className="text-red-500 text-xs hover:scale-110 transition"
                    >
                      ✕
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <Button onClick={addStep} className="mt-4 w-full">
            <Plus size={16} /> Add Step
          </Button>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 flex flex-col">
          {/* Tour header */}
          <div className="p-4 border-b bg-white flex items-center gap-4 shadow-sm">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-lg font-semibold"
            />
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Checkbox
                checked={isPublic}
                onCheckedChange={(val) => setIsPublic(!!val)}
              />
              Public
            </label>
          </div>

          {/* Step editor */}
          <div className="flex-1 flex items-center justify-center bg-gray-100 px-4">
            {activeStepObj ? (
              <Card className="w-full max-w-2xl border border-gray-100">
                <CardHeader>
                  <CardTitle>Edit Step</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Input
                    value={activeStepObj.title}
                    onChange={(e) =>
                      updateStep(activeStepObj.id, "title", e.target.value)
                    }
                    className="text-xl font-semibold"
                  />
                  <Textarea
                    value={activeStepObj.description}
                    onChange={(e) =>
                      updateStep(
                        activeStepObj.id,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                  />
                  {/* Upload section */}
                  <div className="h-52 flex items-center justify-center border-2 border-dashed rounded-xl bg-gray-50 relative overflow-hidden">
                    {activeStepObj.mediaUrl ? (
                      <img
                        src={activeStepObj.mediaUrl}
                        alt="Step"
                        className="h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">Upload screenshot</span>
                    )}
                  </div>
                  <UploadButton<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUpload}
                    onUploadError={(err) =>
                      toast.error(`Upload failed: ${err.message}`)
                    }
                    appearance={{
                      button:
                        "flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition",
                    }}
                  >
                    <Upload size={16} /> Upload Screenshot
                  </UploadButton>
                </CardContent>
              </Card>
            ) : (
              <p className="text-gray-500">Select or add a step</p>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t bg-white p-3 flex justify-end items-center gap-3 shadow-inner">
            <Button onClick={() => setIsPreview(true)} className="bg-blue-600">
              <Play size={16} /> Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600"
            >
              <Save size={16} /> {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </main>

        {/* Preview Modal */}
        <Dialog open={isPreview} onOpenChange={setIsPreview}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Tour Preview</DialogTitle>
            </DialogHeader>
            <div className="grid gap-5 sm:grid-cols-2">
              {steps.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-800">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                  {s.mediaUrl && (
                    <img
                      src={s.mediaUrl}
                      alt={s.title}
                      className="mt-3 max-h-40 object-contain rounded-md border"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProductTourEditor;
