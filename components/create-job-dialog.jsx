"use client";

import { Dialog, DialogClose, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { createJobApplication } from "@/lib/actions/job-applications";
import { toast } from "react-toastify";

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  status: "",
  order: 0,
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobAppDialog({ columnId, boardId, onClickTrigger }) {

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to the server

    try {
      const result = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        // Convert tags string to an array
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      });

      if (!result.error) {
        // Reset the form fields after successful submission
        setFormData(INITIAL_FORM_DATA);
        setOpen(false); // Close the dialog

        onClickTrigger(); // Trigger the reload of jobs in the column

        toast.success("Job application created successfully!", {
          style: {
            width: "100%",
            maxWidth: "500px",
            marginTop: "5px",
            marginLeft: "5px",
            borderRadius: "10px"
          }
        });
      } else {
        console.error("Error creating job application:", result.error);
      }
    } catch (error) {
      console.error("Error creating job application:", error);
    };
  }

  const handleOpenChange = (newOpenState) => {
    if (!newOpenState) {
      // Dialog is closing, reset the form fields and errors
      setFormData(INITIAL_FORM_DATA);
    }
    setOpen(newOpenState);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <span className='
        flex flex-row items-center
        transition-shadow duration-300
        ease-in-out
        hover:text-[#031a11]
        hover:text-shadow-ys hover:text-shadow-blur
        text-[#778ba3]
        text-xs'>
          <Plus className="h-3 w-3" /> Add New Job
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Job Application</DialogTitle>
          <DialogDescription>
            Fill in the details of the job application you want to add.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]" id="company" required value={formData.company}
                  placeholder="company name ..."
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]" id="position" placeholder="position ..."
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]" id="location" placeholder="location ..."
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary *</Label>
                <Input className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]" id="salary" placeholder="salary ..."
                  required
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]" id="jobUrl" placeholder="https://..."
                value={formData.jobUrl}
                onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]" id="tags" placeholder="React, Java, Remote ..."
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="shadow-sm hover:shadow-lg  hover:border-[#0a65e3]"
                id="description"
                placeholder="description ..."
                value={formData.description}
                rows={2}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                className="shadow-sm hover:shadow-lg hover:border-[#0a65e3]"
                id="notes" placeholder="notes ..."
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="mr-2 bg-slate-200 hover:bg-slate-300 text-black" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button className="mr-2 bg-red-400 hover:bg-red-500 text-[#fdfdff]" type="button" onClick={() => {
              setFormData(INITIAL_FORM_DATA);
            }}>
              Reset Fields
            </Button>
            <Button variant="outline" type="submit" className="bg-[#3a88d7] hover:bg-[#137d92] text-white">
              Add Job Application
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}