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

interface Step {
  id: string;
  title: string;
  description: string;
}

interface EditTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: Tour | null;
  onSave: (updatedTour: Tour) => void;
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

  const handleSave = () => {
    onSave(editTour);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={editTour.title}
            onChange={(e) =>
              setEditTour({ ...editTour, title: e.target.value })
            }
            placeholder="Tour Title"
          />

          <ScrollArea className="h-64 border rounded p-2">
            {editTour.steps?.map((step, idx) => (
              <div key={step.id} className="space-y-2 mb-3">
                <Input
                  value={step.title}
                  onChange={(e) => {
                    const updatedSteps = [...(editTour.steps || [])];
                    updatedSteps[idx].title = e.target.value;
                    setEditTour({ ...editTour, steps: updatedSteps });
                  }}
                  placeholder={`Step ${idx + 1} Title`}
                />
                <Textarea
                  value={step.description}
                  onChange={(e) => {
                    const updatedSteps = [...(editTour.steps || [])];
                    updatedSteps[idx].description = e.target.value;
                    setEditTour({ ...editTour, steps: updatedSteps });
                  }}
                  placeholder="Step description"
                />
              </div>
            ))}
          </ScrollArea>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTourDialog;
