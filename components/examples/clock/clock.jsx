
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

 useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Current Time</h1>
      <p className="text-2xl">{time.toLocaleTimeString()}</p>
    </div>
  );
}