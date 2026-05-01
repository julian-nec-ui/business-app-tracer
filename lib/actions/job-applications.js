"use server";

import { getSession } from "../auth/auth";
import dbConnect from "../db";
import { JobApplication } from "../models";
import { Board } from "../models";
import { Column } from "../models";

const DEFAULT_COLUMNS = [
    { name: "Wish List", status: "wish"},
    { name: "Applied", status: "applied"},
    { name: "Interviewing", status: "interviewing"},
    { name: "Offers", status: "offers"},
    { name: "Rejected", status: "rejected"},
    { name: "Archived", status: "archived"}
];

export async function createJobApplication(data) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  await dbConnect();

  const {
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    tags,
    description,
    status,
    columnId,
    boardId
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return { error: "Missing required fields" };
  }

  {/* verify board ownership */ }
  const board = await Board.findOne({ _id: boardId, userId: session.user.id });

  if (!board) {
    return { error: "Board not found" };
  }

  {/* verify if the column belongs to the board */ }
  const column = await Column.findOne({ _id: columnId, boardId: boardId });

  if (!column) {
    return { error: "Column not found" };
  }

  const maxOrderJobApp = await JobApplication.findOne({ columnId: columnId }).sort({ order: -1 }).select('order').lean();

  const jobApplication = new JobApplication({
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    tags: tags || [],
    description,
    status: DEFAULT_COLUMNS.find((col) => col.name === column.name).status || "applied",
    order: maxOrderJobApp ? maxOrderJobApp.order + 1 : 0,
    columnId: columnId,
    boardId: boardId,
    userId: session.user.id
  });

  const jobApp = await JobApplication.insertOne(jobApplication);

  const updatedColumn = await Column.findByIdAndUpdate(
    columnId,
    { $push: { jobApplications: jobApp._id } }
  );

  if (!updatedColumn) {
    return { error: "Failed to update column with new job application" };
  }

  return { success: true, data: JSON.parsejobApp };

}

export async function getBoard(userId, boardId) {

  await dbConnect();

  const board = await Board.findOne({
    userId: userId,
    _id: boardId,
    name: "Job Hunt"
  });

  if (!board) {
    return null;
  }
  
  return JSON.parse(JSON.stringify(board));
}

export async function getBoardById(boardId) {
  
  await dbConnect();

  const board = await Board.findOne({
    _id: boardId,
    name: "Job Hunt"
  });

  if (!board) {
    return null;
  }

  return JSON.parse(JSON.stringify(board));
}

export async function getJobApplicationsByColumnAndBoard(columnId, boardId) {
  await dbConnect();

  const jobApplications = await JobApplication.find({
    columnId: columnId,
    boardId: boardId
  }) || [];

  return JSON.parse(JSON.stringify(jobApplications));
} 

export async function getColumnByIdAndBoardId( columnId, boardId) {

  await dbConnect();

  const column = await Column.findOne({
    _id: columnId,
    boardId: boardId
  });

  if (!column) {
    return null;
  }

  return JSON.parse(JSON.stringify(column));
}

export async function getJobApplicationByIdAndColumnId(columnId, boardId, jobAppId) {
  await dbConnect();

  const jobApplication = await JobApplication.findOne({
    _id: jobAppId,
    columnId: columnId,
    boardId: boardId
  });
  
  if (!jobApplication) {
    return null;
  }

  return JSON.parse(JSON.stringify(jobApplication));

}

export async function deleteJobApplication(jobAppId, columnId, boardId) {
  await dbConnect();

  const column = await Column.findOne({ _id: columnId, boardId: boardId });

  if (!column) {
    return { error: "Column not found" };
  }

  const jobApplication = await JobApplication.findOneAndDelete({
    _id: jobAppId,
    columnId: columnId,
    boardId: boardId
  });

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  // Remove the job application reference from the column's jobApplications array
  await Column.findByIdAndUpdate(columnId, { $pull: { jobApplications: jobAppId } });

  return { success: true, data: JSON.parse(JSON.stringify(jobApplication)) };
}

export async function deleteJobColumn(columnId, boardId) {
  await dbConnect();

  const column = await Column.findOne({ _id: columnId, boardId: boardId });

  if (!column) {
    return { error: "Column not found" };
  }

  // Delete all job applications associated with this column
  await JobApplication.deleteMany({ columnId: columnId, boardId: boardId });

  // Remove the column reference from the board's columns array
  await Board.findByIdAndUpdate(boardId, { $pull: { columns: columnId } });

  // Delete the column itself
  const deletedColumn = await Column.findByIdAndDelete(columnId);

  if (!deletedColumn) {
    return { error: "Failed to delete the column" };
  }

  return { success: true, data: JSON.parse(JSON.stringify(deletedColumn)) };
}