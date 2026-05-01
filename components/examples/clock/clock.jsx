
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="rounded-sm bg-sky-900 w-70">
        <p className="font-sans text-center text-white text-md tabular-nums">{time ?? 'reloading ...'}</p>
      </span>
    </div>
  );
}