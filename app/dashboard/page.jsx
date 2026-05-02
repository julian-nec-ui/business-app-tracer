import { Refresh } from "@mui/icons-material";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "../../lib/auth/auth";
import ReloadJobs from "@/components/ui/reload-page";
import dbConnect from "../../lib/db";
import Board from "@/lib/models/board";

async function getBoard(userId) {

  await dbConnect();

  const board = await Board.findOne({
    userId: userId,
    name: "Job Hunt"
  });

  if (!board) {
    return null;
  }

  return JSON.parse(JSON.stringify(board));
}

async function DashboardPage() {

  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const board = await getBoard(session?.user.id);

  return (
    <div className="min-h-screen bg-white-100">
      <div className="container p-6 mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">
            {board.name || "Default Dashboard"}
          </h1>
          <p className="mb-2 text-gray-600">Manage your job applications efficiently.</p>
          <ReloadJobs userId={session?.user.id} boardId={board._id} />
        </div>
      </div>
    </div>
  );

}

export default function Dashboard() {
  return (
    <Suspense fallback={<span className={`ml-6 mt-5 mb-4 inline-flex items-center
              rounded-md bg-green-800/10 px-2 py-1 text-md font-medium
               text-[#045a43] inset-ring inset-ring-green-900/40
                hover:bg-green-800/20 hover:text-[#045a43] 
                transition-all duration-300 ease-in-out`}
          >
            {DashboardPage ? <Refresh className="w-3 h-3 mr-2 animate-spin" /> : <Refresh className="w-3 h-3 mr-2" />}
            <br/><br/>
            Loading ... Please wait ...
          </span>}>
      <DashboardPage />
    </Suspense>
  );
};