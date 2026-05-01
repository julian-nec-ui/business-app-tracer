"use client";

import { Dialog, DialogClose, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { MdWarning } from "react-icons/md";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Divider } from "@mui/material";
import { deleteJobApplication } from "@/lib/actions/job-applications";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function DeleteJobDialog({ openIt, job, columnId, boardId, onClickTrigger }) {

  console.log("DeleteJobDialog job: " + JSON.stringify(job));

  const [open, setOpen] = useState(openIt);

  useEffect(() => {
    setOpen(openIt);
  }, [openIt]);

  async function handleDeleteJob(jobId, columnId, boardId) {
      const currentColumn = await getColumnByIdAndBoardId(columnId, boardId);
  
      if (!currentColumn) {
        alert("Failed to find the column for the job application.");
        return;
      }
  
      const deletedJob = await deleteJobApplication(jobId, columnId, boardId);
  
      if (!deletedJob.success) {
        alert("Job deletion failed: " + deletedJob.error);
        return;
      }
  
      toast.success("Job application deleted successfully!", {
        style: {
          width: "100%",
          maxWidth: "500px",
          marginTop: "5px",
          marginLeft: "5px",
          borderRadius: "10px"
        }
      });
  
      console.log("Deleted Job:", deletedJob.data);
      onClickTrigger(); // Trigger the reload of jobs in the column
  
      setOpen(false);
    }

  function setOpenAndClose(isOpen) {
    setOpen(isOpen);
  }

  return (

    <Dialog open={open} onOpenChange={setOpenAndClose}>

      <DialogContent onInteractOutside={(e) => e.preventDefault()}
        className="min-w-155 max-w-200 bg-[#f4f9fd]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center text-[#ee1010] gap-2 text-2xl mb-1">
              <MdWarning className="text-[#ee1010] w-7 h-7 mb-1" />
              Delete Job
            </div>
            <Divider sx={{ borderBottomWidth: 3, borderColor: '#86838591', marginBottom: 4 }} />
            <span className="flex mb-2 mt-4 font-semibold text-[#5e5897]">
              Job Title: "{job.position}"
            </span>
            <span className="flex mb-3 mt-2 font-semibold text-[#5e5897]">
              Company: "{job.company}"
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-[28px] text-[#dd111f] font-semibold">
              This action cannot be undone !
            </span>

          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="mr-2 bg-slate-200 text-md hover:bg-slate-300 text-black" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button className="mr-2 bg-[#d90e1c] text-md hover:bg-[#ff0000] text-white" onClick={() => handleDeleteJob(job._id, columnId, boardId)}>
            Delete Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
