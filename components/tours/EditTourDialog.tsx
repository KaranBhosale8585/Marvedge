"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Step {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  order: number;
  tags?: string[];
  duration?: number;
}

interface Tour {
  id: string;
  title: string;
  isPublic: boolean;
  status: "Public" | "Private";
  userId: string;
  steps?: Step[];
}

interface EditTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: Tour | null;
  onSave: (updatedTour: Tour) => Promise<void>;
}

const EditTourDialog = ({
  open,
  onOpenChange,
  tour,
  onSave,
}: EditTourDialogProps) => {
  const [editTour, setEditTour] = useState<Tour | null>(tour);

  useEffect(() => {
    setEditTour(tour);
  }, [tour]);

  if (!editTour) return null;

  const handleStepChange = (idx: number, field: keyof Step, value: unknown) => {
    if (!editTour.steps) return;
    const updatedSteps = [...editTour.steps];
    updatedSteps[idx] = { ...updatedSteps[idx], [field]: value };
    setEditTour({ ...editTour, steps: updatedSteps });
  };

  const handleSave = async () => {
    if (!editTour) return;
    editTour.steps?.forEach((step) => {
      if (!step.tags) step.tags = [];
    });
    await onSave(editTour);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full sm:w-[90%]">
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tour Title */}
          <Input
            value={editTour.title}
            onChange={(e) =>
              setEditTour({ ...editTour, title: e.target.value })
            }
            placeholder="Tour Title"
          />

          {/* Public / Private Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={editTour.isPublic}
              onChange={(e) =>
                setEditTour({
                  ...editTour,
                  isPublic: e.target.checked,
                  status: e.target.checked ? "Public" : "Private",
                })
              }
            />
            <span>{editTour.isPublic ? "Public" : "Private"}</span>
          </label>

          {/* Steps Editor */}
          <ScrollArea className="h-80 border rounded p-2">
            {editTour.steps?.map((step, idx) => (
              <div
                key={step.id}
                className="space-y-2 mb-4 border-b pb-3 last:border-b-0"
              >
                <Input
                  value={step.title}
                  onChange={(e) =>
                    handleStepChange(idx, "title", e.target.value)
                  }
                  placeholder={`Step ${idx + 1} Title`}
                />
                <Textarea
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(idx, "description", e.target.value)
                  }
                  placeholder="Step description"
                />
                {step.mediaUrl && (
                  <div className="relative h-24 w-36 mb-1 rounded overflow-hidden">
                    <Image
                      src={step.mediaUrl}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <Input
                  value={step.mediaUrl || ""}
                  onChange={(e) =>
                    handleStepChange(idx, "mediaUrl", e.target.value)
                  }
                  placeholder="Media URL"
                />
                <div className="flex gap-2 flex-wrap">
                  <Input
                    value={step.order}
                    type="number"
                    onChange={(e) =>
                      handleStepChange(idx, "order", Number(e.target.value))
                    }
                    placeholder="Order"
                    className="w-24"
                  />
                  <Input
                    value={(step.tags || []).join(", ")}
                    onChange={(e) =>
                      handleStepChange(
                        idx,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim())
                      )
                    }
                    placeholder="Tags (comma separated)"
                    className="flex-1 min-w-[120px]"
                  />
                  <Input
                    value={step.duration || ""}
                    type="number"
                    onChange={(e) =>
                      handleStepChange(
                        idx,
                        "duration",
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                    placeholder="Duration (min)"
                    className="w-28"
                  />
                </div>
              </div>
            ))}
          </ScrollArea>

          <Button onClick={handleSave} className="w-full mt-2">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTourDialog;
