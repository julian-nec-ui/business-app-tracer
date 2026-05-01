import { get } from "mongoose";
import dbConnect from "./db";
import Board from "./models/board";
import Column from "./models/column";
import JobApplication from "./models/job-applications";

let newBoard = null;

// Default columns for new board
const DEFAULT_COLUMNS = [
    { name: "Wish List", order: 0 },
    { name: "Applied", order: 1 },
    { name: "Interviewing", order: 2 },
    { name: "Offers", order: 3 },
    { name: "Rejected", order: 4 },
    { name: "Archived", order: 5 }
];

function getDefaultColumns() {
    const columns = [];

    DEFAULT_COLUMNS.map(col => {
        const newColumn = new Column({
            name: col.name,
            order: col.order,
            boardId: null,
            jobApplications: []
        });

        columns.push(newColumn);
    });

    return columns;
}

// Default job applications for each column
const DEFAULT_JOB_APPLICATIONS_WISH_LIST = [
    {
        company: "Google",
        position: "Software Engineer",
        location: "Mountain View, CA",
        status: "wish",
        notes: "Applied through referral",
        salary: "$120,000",
        jobUrl: "https://careers.google.com/jobs/results/123456-software-engineer/",
        appliedDate: new Date(),
        tags: ["referral", "tech"],
        description: "Exciting opportunity to work on cutting-edge technology at Google."
    },
    {
        company: "Amazon",
        position: "Frontend Developer",
        location: "Seattle, WA",
        status: "wish",
        notes: "Had a great phone screen, waiting for next steps",
        salary: "$110,000",
        jobUrl: "https://www.amazon.jobs/en/jobs/654321-frontend-developer",
        appliedDate: new Date(),
        tags: ["e-commerce", "tech"],
        description: "Join Amazon's dynamic team to build innovative frontend solutions for millions of customers."
    },
    {
        company: "Microsoft",
        position: "Data Scientist",
        location: "Redmond, WA",
        status: "wish",
        salary: "$130,000",
        jobUrl: "https://careers.microsoft.com/us/en/job/789012-data-scientist",
        appliedDate: new Date(),
        tags: ["data", "tech"],
        description: "Work with Microsoft’s data science team to drive insights and innovation across the company."
    }
];

function getDefaultWishJobs() {
    let jobsWishList = [];
    DEFAULT_JOB_APPLICATIONS_WISH_LIST.map((job, index) => {
        const newJobWishList = new JobApplication({
            company: job.company,
            position: job.position,
            location: job.location,
            status: job.status,
            order: index,
            notes: job.notes,
            salary: job.salary,
            jobUrl: job.jobUrl,
            appliedDate: job.appliedDate,
            tags: job.tags,
            description: job.description
        });
        jobsWishList.push(newJobWishList);
    });
    return jobsWishList;
}

const DEFAULT_JOB_APPLICATIONS_APPLIED = [
    {
        company: "Facebook",
        position: "Backend Engineer",
        location: "Menlo Park, CA",
        status: "applied",
        notes: "Applied through LinkedIn, waiting for response",
        salary: "$125,000",
        jobUrl: "https://www.facebook.com/careers/jobs/123456-backend-engineer",
        appliedDate: new Date(),
        tags: ["social media", "tech"],
        description: "Join Facebook’s backend engineering team to build scalable systems that power the world’s largest social network."
    },
    {
        company: "Apple",
        position: "iOS Developer",
        location: "Cupertino, CA",
        status: "applied",
        notes: "Had an onsite interview, waiting for feedback",
        salary: "$115,000",
        jobUrl: "https://www.apple.com/careers/us/en/job/654321-ios-developer",
        appliedDate: new Date(),
        tags: ["mobile", "tech"],
        description: "Work on Apple’s iOS team to create innovative apps and features for millions of users worldwide."
    },
    {
        company: "Tesla",
        position: "Machine Learning Engineer",
        location: "Palo Alto, CA",
        status: "applied",
        notes: "Applied through company website, waiting for response",
        salary: "$135,000",
        jobUrl: "https://www.tesla.com/careers/jobs/789012-machine-learning-engineer",
        appliedDate: new Date(),
        tags: ["automotive", "tech"],
        description: "Join Tesla’s machine learning team to develop cutting-edge AI solutions for autonomous driving and energy optimization."
    },
    {
        company: "Spotify",
        position: "Data Analyst",
        location: "New York, NY",
        status: "applied",
        notes: "Had a great phone screen, waiting for next steps",
        salary: "$105,000",
        jobUrl: "https://www.spotifyjobs.com/jobs/123456-data-analyst",
        appliedDate: new Date(),
        tags: ["music", "tech"],
        description: "Work with Spotify’s data analytics team to drive insights and innovation across the music streaming platform."
    },
    {
        company: "Oracle",
        position: "Cloud Engineer",
        location: "Redwood City, CA",
        status: "applied",
        notes: "Applied through referral, waiting for response",
        salary: "$120,000",
        jobUrl: "https://www.oracle.com/careers/jobs/654321-cloud-engineer",
        appliedDate: new Date(),
        tags: ["cloud", "tech"],
        description: "Join Oracle’s cloud engineering team to build scalable solutions that power our enterprise cloud services."
    }
];

function getDefaultAppliedJobs() {
    let jobsAppliedList = [];

    DEFAULT_JOB_APPLICATIONS_APPLIED.map((job, index) => {
        const newJobApplied = new JobApplication({
            company: job.company,
            position: job.position,
            location: job.location,
            status: job.status,
            order: index,
            notes: job.notes,
            salary: job.salary,
            jobUrl: job.jobUrl,
            appliedDate: job.appliedDate,
            tags: job.tags,
            description: job.description
        });
        jobsAppliedList.push(newJobApplied);
    });
    return jobsAppliedList;
}

const DEFAULT_JOB_APPLICATIONS_INTERVIEWING = [
    {
        company: "Netflix",
        position: "DevOps Engineer",
        location: "Los Gatos, CA",
        status: "interviewing",
        notes: "Phone interview scheduled",
        salary: "$120,000",
        jobUrl: "https://jobs.netflix.com/jobs/123456-devops-engineer",
        appliedDate: new Date(),
        tags: ["streaming", "tech"],
        description: "Join Netflix’s DevOps team to ensure smooth deployment and operation of our streaming services."
    },
    {
        company: "Airbnb",
        position: "Full Stack Developer",
        location: "San Francisco, CA",
        status: "interviewing",
        notes: "Received offer, considering options",
        salary: "$130,000",
        jobUrl: "https://careers.airbnb.com/jobs/654321-full-stack-developer",
        appliedDate: new Date(),
        tags: ["travel", "tech"],
        description: "Work on Airbnb’s full stack team to build innovative features that enhance the travel experience for millions of users."
    },
    {
        company: "Uber",
        position: "Data Engineer",
        location: "San Francisco, CA",
        status: "interviewing",
        notes: "Received rejection email, keep improving",
        salary: "$125,000",
        jobUrl: "https://www.uber.com/careers/jobs/789012-data-engineer",
        appliedDate: new Date(),
        tags: ["transportation", "tech"],
        description: "Join Uber’s data engineering team to build scalable data pipelines that power our transportation platform."
    },
    {
        company: "LinkedIn",
        position: "Product Manager",
        location: "Sunnyvale, CA",
        status: "interviewing",
        notes: "Applied through company website, waiting for response",
        salary: "$135,000",
        jobUrl: "https://careers.linkedin.com/jobs/123456-product-manager",
        appliedDate: new Date(),
        tags: ["social media", "tech"],
        description: "Join LinkedIn’s product management team to drive the development of innovative features that connect professionals worldwide."
    }
];

function getDefaultInterviewingJobs() {
    let jobsInterviewingList = [];
    DEFAULT_JOB_APPLICATIONS_INTERVIEWING.map((job, index) => {
        const newJobInterviewing = new JobApplication({
            company: job.company,
            position: job.position,
            location: job.location,
            status: job.status,
            order: index,
            notes: job.notes,
            salary: job.salary,
            jobUrl: job.jobUrl,
            appliedDate: job.appliedDate,
            tags: job.tags,
            description: job.description
        });
        jobsInterviewingList.push(newJobInterviewing);
    });
    return jobsInterviewingList;
}

const DEFAULT_JOB_APPLICATIONS_OFFERS = [
    {
        company: "Twitter",
        position: "Software Engineer",
        location: "San Francisco, CA",
        status: "offers",
        notes: "Received offer, negotiating salary",
        salary: "$125,000",
        jobUrl: "https://careers.twitter.com/jobs/123456-software-engineer",
        appliedDate: new Date(),
        tags: ["social media", "tech"],
        description: "Join Twitter’s engineering team to build innovative features that connect people around the world."
    },
    {
        company: "Salesforce",
        position: "Cloud Engineer",
        location: "San Francisco, CA",
        status: "offers",
        notes: "Received offer, considering options",
        salary: "$130,000",
        jobUrl: "https://www.salesforce.com/company/careers/jobs/654321-cloud-engineer/",
        appliedDate: new Date(),
        tags: ["cloud", "tech"],
        description: "Join Salesforce’s cloud engineering team to build scalable solutions that power our customer relationship management platform."
    },
    {
        company: "Adobe",
        position: "UX Designer",
        location: "San Jose, CA",
        status: "offers",
        notes: "Received offer, negotiating salary",
        salary: "$115,000",
        jobUrl: "https://www.adobe.com/careers/jobs/789012-ux-designer",
        appliedDate: new Date(),
        tags: ["design", "tech"],
        description: "Join Adobe’s UX design team to create innovative user experiences for our creative software products."
    },
    {
        company: "Dropbox",
        position: "Software Engineer",
        location: "San Francisco, CA",
        status: "offers",
        notes: "Received offer, negotiating salary",
        salary: "$120,000",
        jobUrl: "https://www.dropbox.com/jobs/123456-software-engineer",
        appliedDate: new Date(),
        tags: ["cloud storage", "tech"],
        description: "Join Dropbox’s engineering team to build innovative features that help people stay organized and productive."
    }
];

function getDefaultOffersJobs() {
    let jobsOffersList = [];
    DEFAULT_JOB_APPLICATIONS_OFFERS.map((job, index) => {
        const newJobOffer = new JobApplication({
            company: job.company,
            position: job.position,
            location: job.location,
            status: job.status,
            order: index,
            notes: job.notes,
            salary: job.salary,
            jobUrl: job.jobUrl,
            appliedDate: job.appliedDate,
            tags: job.tags,
            description: job.description
        });
        jobsOffersList.push(newJobOffer);
    });
    return jobsOffersList;
}

const DEFAULT_JOB_APPLICATIONS_REJECTED = [
    {
        company: "Dropbox",
        position: "Software Engineer",
        location: "San Francisco, CA",
        status: "rejected",
        notes: "Received rejection email, keep improving",
        salary: "$120,000",
        jobUrl: "https://www.dropbox.com/jobs/123456-software-engineer",
        appliedDate: new Date(),
        tags: ["cloud storage", "tech"],
        description: "Join Dropbox’s engineering team to build innovative features that help people stay organized and productive."
    },
    {
        company: "Slack",
        position: "Frontend Developer",
        location: "San Francisco, CA",
        status: "rejected",
        notes: "Received rejection email, keep improving",
        salary: "$115,000",
        jobUrl: "https://slack.com/careers/jobs/654321-frontend-developer",
        appliedDate: new Date(),
        tags: ["communication", "tech"],
        description: "Join Slack’s frontend team to build innovative features that enhance communication and collaboration for millions of users."
    },
    {
        company: "GitHub",
        position: "Backend Engineer",
        location: "San Francisco, CA",
        status: "rejected",
        notes: "Received rejection email, keep improving",
        salary: "$125,000",
        jobUrl: "https://github.com/careers/jobs/123456-backend-engineer",
        appliedDate: new Date(),
        tags: ["software development", "tech"],
        description: "Join GitHub’s backend team to build innovative features that enhance collaboration and productivity for millions of developers."
    }
];

function getDefaultRejectedJobs() {
    let jobsRejectedList = [];
    DEFAULT_JOB_APPLICATIONS_REJECTED.map((job, index) => {
        const newJobRejected = new JobApplication({
            company: job.company,
            position: job.position,
            location: job.location,
            status: job.status,
            order: index,
            notes: job.notes,
            salary: job.salary,
            jobUrl: job.jobUrl,
            appliedDate: job.appliedDate,
            tags: job.tags,
            description: job.description
        });
        jobsRejectedList.push(newJobRejected);
    });
    return jobsRejectedList;
}

const DEFAULT_JOB_APPLICATIONS_ARCHIVED = [
    {
        company: "Spotify",
        position: "Data Analyst",
        location: "New York, NY",
        status: "archived",
        notes: "Archived after accepting another offer",
        salary: "$105,000",
        jobUrl: "https://www.spotifyjobs.com/jobs/123456-data-analyst",
        appliedDate: new Date(),
        tags: ["music", "tech"],
        description: "Work with Spotify’s data analytics team to drive insights and innovation across the music streaming platform."
    },
    {
        company: "Oracle",
        position: "Cloud Engineer",
        location: "Redwood City, CA",
        status: "archived",
        notes: "Archived after deciding to pursue a different career path",
        salary: "$120,000",
        jobUrl: "https://www.oracle.com/careers/jobs/654321-cloud-engineer",
        appliedDate: new Date(),
        tags: ["cloud", "tech"],
        description: "Join Oracle’s cloud engineering team to build scalable solutions that power our enterprise cloud services."
    }
];

function getDefaultArchivedJobs() {
    let jobsArchivedList = [];
    DEFAULT_JOB_APPLICATIONS_ARCHIVED.map((job, index) => {
        const newJobArchived = new JobApplication({
            company: job.company,
            position: job.position,
            location: job.location,
            status: job.status,
            order: index,
            notes: job.notes,
            salary: job.salary,
            jobUrl: job.jobUrl,
            appliedDate: job.appliedDate,
            tags: job.tags,
            description: job.description
        });
        jobsArchivedList.push(newJobArchived);
    });
    return jobsArchivedList;
}

export async function initUserBoard(userId) {

    try {
        await dbConnect();
        // Check if the user already has a board
        const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

        if (existingBoard) {
            console.log("Existing board found for user, skipping board creation :::", existingBoard);
            return existingBoard;
        }

        console.log("No existing board found for user, creating a new one.");
        // If not, create a new board for the user
        newBoard = new Board({
            name: "Job Hunt",
            userId: null,
            columns: []
        });
        newBoard.userId = userId;

        let insertedColumns = [];

        const initBoard = await Board.insertOne(newBoard);
        const boardId = initBoard._id;
        const columns = getDefaultColumns();

        console.log("New board created with ID:", boardId);
        console.log("COLUMNS TO INSERT:", columns);

        // Create columns for the new board
        for (let col of columns) {
            col.boardId = boardId;
            console.log(`Inserting column "${col._id}" for board ID:`, boardId);

            const initColumn = await Column.insertOne(col);
            const columnId = initColumn._id;
            console.log(`Column "${col.name}" created with ID:`, columnId);
            insertedColumns.push(columnId);

            // Add default job applications to the appropriate columns
            // let jobsToInsert = [];

            // if (col.name === "Wish List") {
            //     jobsToInsert = getDefaultWishJobs();
            // } else if (col.name === "Applied") {
            //     jobsToInsert = getDefaultAppliedJobs();
            // } else if (col.name === "Interviewing") {
            //     jobsToInsert = getDefaultInterviewingJobs();
            // } else if (col.name === "Offers") {
            //     jobsToInsert = getDefaultOffersJobs();
            // } else if (col.name === "Rejected") {
            //     jobsToInsert = getDefaultRejectedJobs();
            // } else if (col.name === "Archived") {
            //     jobsToInsert = getDefaultArchivedJobs();
            // }

            // let insertedJobsIds = [];

            // for (let job of jobsToInsert) {
            //     job.boardId = boardId;
            //     job.columnId = columnId;
            //     job.userId = userId;

            //     const initJob = await JobApplication.insertOne(job);
            //     const insertedJobId = initJob._id;
            //     insertedJobsIds.push(insertedJobId);
            //     console.log(`Job application for "${job.position}" at "${job.company}" created with ID:`, insertedJobId);
            // }

            // const currentColumn = await Column.findOne({ _id: columnId });
            // currentColumn.jobApplications = insertedJobsIds;
            // await Column.updateOne({ _id: columnId }, { $set: { jobApplications: currentColumn.jobApplications } });
            // console.log(`Column "${col.name}" updated with job application IDs:`, insertedJobsIds);
            // insertedJobsIds = [];
            // jobsToInsert = [];
        }

        const boardColumnsUpdated = await Board.updateOne({ _id: boardId }, { $set: { columns: insertedColumns } });
        console.log("Board columns updated with column IDs:", boardColumnsUpdated.modifiedCount);
        insertedColumns = [];

    } catch (err) {
        console.error("Error initializing user board:", err);
    }
}
