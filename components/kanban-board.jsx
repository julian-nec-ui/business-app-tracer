"use client";

import { Card } from "@material-tailwind/react";

import 'material-icons/iconfont/material-icons.css';

import {
  Award,
  Calendar,
  CheckCircle2,
  Archive,
  Mic,
  XCircle,
  Edit3,
  Trash2
} from "lucide-react";

import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

import { CardHeader } from "react-bootstrap";
import { CardTitle } from "./ui/card";
import { DropdownMenu } from "./ui/dropdown-menu";

import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu";

import Divider from '@mui/material/Divider';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { MdWarning } from "react-icons/md";
import { MoreVertical } from "lucide-react";
import { CardContent } from "@mui/material";
import CreateJobAppDialog from "./create-job-dialog";
import { useEffect, useState } from "react";

import {
  getJobApplicationsByColumnAndBoard,
  getColumnByIdAndBoardId,
  deleteJobApplication
} from "@/lib/actions/job-applications";

import { toast } from "react-toastify";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "./ui/dialog";

import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { deleteJobColumn } from "@/lib/actions/job-applications";
import DeleteColumnDialog from "./deleteColumnDialog";
import IconMenu from "./examples/icon-menu/iconMenu";
import ReceiptReviewCard from "./examples/card/receipe-card";
import ResizeExample from "./examples/resizing/resizeExample";
import ResponsiveGrid from "./examples/grid/gridExample";

const focusBackground = "focus:bg-[#7FBBBB35]"; // Define the focus background color

const COLUMN_CONFIG = [
  {
    color: "bg-sky-200",
    icon: <Calendar className="ml-3 h-5 w-5" />
  },
  {
    color: "bg-teal-200",
    icon: <CheckCircle2 className="ml-3 h-5 w-5" />
  },
  {
    color: "bg-[#6BD3D9C7]",
    icon: <Mic className="ml-3 h-5 w-5" />
  },
  {
    color: "bg-[#2FE95798]",
    icon: <Award className="ml-3 h-5 w-5" />
  },
  {
    color: "bg-[#EC4A4ACA]",
    icon: <XCircle className="ml-3 h-5 w-5" />
  },
  {
    color: "bg-[#8CC2C3D1]",
    icon: <Archive className="ml-3 h-5 w-5" />
  }
];

function DragableColumn({ column, config, boardId, sortedColumns }) {

  const [open, setOpen] = useState(false);
  const [sortedJobs, setSortedJobs] = useState(column.jobApplications);//.sort((a, b) => b.order - a.order) || []);
  const [loading, setLoading] = useState(false);

  function handleEditColumn(columnId, columnName, jobs) {
    alert("Edit column with ID: " + columnId + " and name: " + columnName);
  }

  async function handleReloadColumnJobs(boardId, columnId) {
    setLoading(true);
    const columnJobs = await getJobApplicationsByColumnAndBoard(columnId, boardId);

    if (!columnJobs) {
      alert("Failed to reload jobs for column ID: " + columnId);
      return;
    }

    column.jobApplications = columnJobs;

    setLoading(false);
  }

  async function handleDeleteColumn(columnId, boardId) {
    const deletedColumn = await deleteJobColumn(columnId, boardId);

    if (!deletedColumn) {
      alert("Failed to find the column.");
      return;
    }

    toast.success("Job column deleted successfully!", {
      style: {
        width: "100%",
        maxWidth: "500px",
        marginTop: "5px",
        marginLeft: "5px",
        borderRadius: "10px"
      }
    });

    setOpen(false);
  }

  async function setOpenAndClose(newOpenState) {
    if (!newOpenState) {
      setOpen(false);
    }
  }

  return (
    <Card className="min-w-[300] shrink-0 shadow-md p-0 mb-4 rounded-lg">
      <CardHeader className={`${config.color} text-[#04335a] rounded-t-lg pb-3 pt-3 mb-3`}>
        <div className="flex items-center justify-between mr-2">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-[#04335a] text-xl font-semibold cursor-default">
              {column.name}
            </CardTitle>
            <div className="flex ml-7 h-7 gap-2 relative top-0.5 items-center justify-center">
              <span className={`
                  cursor-pointer mb-1
                  items-center rounded-md px-2 py-1 
                  text-sm font-medium text-[#04335a]
                  hover:bg-[#d8f5fe] transition-all
                  duration-300 ease-in-out shadow-sm hover:shadow-md`}
                onClick={() => handleReloadColumnJobs(boardId, column._id)}
              >
                {loading ? <AutorenewIcon style={{ width: "25px", height: "25px" }} className="mr-1 animate-spin" /> : <AutorenewIcon style={{ width: "25px", height: "25px" }} className="mr-1" />}
                Refresh {column.name}
              </span>
              <span>
                <CreateJobAppDialog columnId={column._id} boardId={boardId} onClickTrigger={() => handleReloadColumnJobs(boardId, column._id)} />
              </span>
              <span className={`
                  cursor-pointer mb-1 flex
                  items-center rounded-md px-2 py-1 
                  text-sm font-medium text-[#04335a]
                  hover:bg-[#d8f5fe] transition-all
                  duration-300 ease-in-out shadow-sm hover:shadow-md`}
                onClick={(e) => { e.preventDefault(); setOpen(true) }}>
                <Trash2 className="h-4 w-4 mr-2 text-[#000000]" />
                Delete Column
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-3 w-4 h-6 rounded-sm">
                <MoreVertical className="w-4 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 mt-2 mr-4 w-auto rounded-md border bg-white p-1 shadow-md">
              <DropdownMenuItem focusBackground={focusBackground || "focus:bg-sky-200"} onClick={() => handleEditColumn(column._id, column.name, column.jobApplications)}>
                <Edit3 className="h-4 w-4 mr-2" />
                <span className="text-[23px]">Edit Column</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#f90000]" focusBackground={focusBackground || "focus:bg-sky-200"} onClick={() => handleDleteColumn(column._id, boardId)}>
                <Trash2 className="h-4 w-4 mr-2 text-[#f90000]" />
                <span className="text-[23px]">Delete Column</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteColumnDialog openIt={open} column={column} boardId={boardId} onStateChange={setOpenAndClose} />

        </div>
      </CardHeader>

      <ScrollArea className="h-125 rounded-md border border-slate-100 shadow-lg p-4 ml-2 mr-2 mb-2">
        <CardContent className={`
          space-y-2
          pt-4
         bg-gray-50/50
          min-h-[400]
          rounded-b-lg
          scrollbar-thin
          scroll-auto`}
        >
          {/* <motion.ul layout>
            <AnimatePresence> AnimatePresence manages exit animations */}
          <Reorder.Group values={sortedJobs} onReorder={setSortedJobs}>
            {sortedJobs.map((job, key) => (

              // <motion.li className="mb-1"
              //   key={key}
              //   initial={{ opacity: 1, y: -50, backgroundColor: "#1AAF49", color: "#ffffff" }} // Animation from (initial state)
              //   animate={{ opacity: 1, y: 0, backgroundColor: "#ffffff", color: "#04335a" }}   // Animation to (animate state)
              //   exit={{ opacity: 0.65, x: - 20, backgroundColor: "#ff0000", color: "#ffffff" }}   // Animation on removal
              //   transition={{ type: "spring", stiffness: 150, damping: 30 }}

              // >
              <Reorder.Item key={key} value={job}>
                <JobCard
                  key={key}
                  job={{ ...job, columnId: job.columnId || column._id }}
                  columnId={column._id}
                  boardId={boardId}
                  onClickTrigger={() => handleReloadColumnJobs(boardId, column._id)}
                />
              </Reorder.Item>
              // </motion.li>

            ))
            }
          </Reorder.Group>
          {/* </AnimatePresence>
          </motion.ul> */}

        </CardContent>
      </ScrollArea>
    </Card>
  )
}

function JobCard({ job, columnId, boardId, onClickTrigger }) {
  const [open, setOpen] = useState(false);
  const [openDropDownMenu, setOpenDropDownMenu] = useState(false);

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

    onClickTrigger(); // Trigger the reload of jobs in the column

    setOpen(false);
    setOpenDropDownMenu(false);
  }

  async function setOpenAndClose(newOpenState) {
    if (!newOpenState) {
      setOpen(false);
      setOpenDropDownMenu(false);
    }
  }

  // const processData = (callback) => {
  //   const data = {
  //     id: 1,
  //     value: "Sample Data",
  //     time: new Date().toISOString()
  //   }

  //   return callback(data);
  // }

  // const result = processData(({value, time}) => ({
  //   data: `Processed value: ${value} at ${time}`,
  // }));

  async function onClose() {
    setOpenDropDownMenu(false);
  }

  return (
    <div>
      <Card className="bg-white w-100 h-20 mb-2 shadow-lg p-2 rounded-md hover:bg-[#dbf3e8b3]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">{job.company}</p>
            <p className="text-xs text-gray-500">{job.position}</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu open={openDropDownMenu} onOpenChange={setOpenDropDownMenu}>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" size="icon" className="ml-3 w-5 h-7 rounded-sm hover:text-white hover:bg-[#78a7b4]">
                  <MoreVertical style={{ width: '100%', height: '100%', fontSize: '1.75rem' }} />
                </Button> */}
                <md-elevated-button className="rounded-sm">
                  <MoreVertical className="w-5 h-7 bg-white rounded-sm" />
                </md-elevated-button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="ml-6 mt-2 mr-4 w-auto rounded-md border bg-white p-1 shadow-md">
                <IconMenu onClose={onClose} columnId={columnId} jobAppId={job._id} />
              </DropdownMenuContent>
            </DropdownMenu>

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

          </div>
        </div>

      </Card>

    </div>
  );
}

export default function KanbanBoard({ board, userId }) {

  const columns = board.columns || [];
  const sortedColumns = columns?.sort((a, b) => a.order - b.order);
  const [containerWidth, setContainerWidth] = useState('100%');

  useEffect(() => {
    setContainerWidth(window.innerWidth > 100 ? '75%' : '100%');
  }, [containerWidth]);

  if (!board) {
    return;
  }

  return (
    <>
      <div className="shadow-xl border border-slate-300 rounded-lg p-4 bg-white">
        <div>
          <ResponsiveGrid />
        </div>
        {/* <div>
          {columns.map((column, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-gray-500", icon: <Calendar className="h-4 w-4" />
            };
            return (
              < DragableColumn
                key={key}
                column={column}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
        <div>
          <ReceiptReviewCard />
        </div>
        <div className="mt-3">
        </div> */}
      </div>
    </>
  );
}