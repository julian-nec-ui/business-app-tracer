"use client";

import { Refresh } from "@mui/icons-material";
import { useState } from "react";
import { getBoard } from "@/lib/actions/job-applications";
import KanbanBoard from "@/components/kanban-board";
import { useEffect } from "react";

export default function ReloadJobs({ userId, boardId }) {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [containerWidth, setContainerWidth] = useState('100%');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBoard(userId, boardId);
      setData(result);
    };

    fetchData();
  }, [userId, boardId]);

  useEffect(() => {
    setContainerWidth(window.innerWidth > 768 ? '75%' : '100%');
  }, [containerWidth]);

  async function handleReloadBoard() {
    setLoading(true);
    const result = await getBoard(userId, boardId);

    if (!result) {
      alert("Failed to reload board data.");
      setLoading(false);
      return;
    }

    setData(result);
    setLoading(false);
  }

  return (
    <div className={`
              rounded-sm bg-slate-200/50 px-2 py-1 text-md font-medium
               text-[#045a43] inset-ring inset-ring-green-900/40
                hover:bg-slate-300/40 hover:text-[#045a43] 
                transition-all duration-300 ease-in-out
              `}
    >
      <span className={`cursor-pointer
                        items-center rounded-md mb-2 mt-2
                        text-sm font-medium text-[#04335a]
                        hover:bg-[#d8f5fe] transition-all
                        duration-300 ease-in-out hover:shadow-md`
      }
        onClick={handleReloadBoard}
      >
        {loading ? <Refresh className="mr-2 h-3 w-3 animate-spin" /> : <Refresh className="mr-2 h-3 w-3" />}

        Reload All Jobs
      </span>
      {data && <KanbanBoard board={data} userId={boardId} />}
      <div className="mt-4">
      </div>

    </div>

  );
}