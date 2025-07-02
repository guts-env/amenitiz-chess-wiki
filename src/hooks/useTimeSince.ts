import { useEffect, useState } from "react";
import dayjs from "dayjs";

function useTimeSince(timestamp: number) {
  const [timeSince, setTimeSince] = useState(() => dayjs().diff(dayjs.unix(timestamp), 'second'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(dayjs().diff(dayjs.unix(timestamp), 'second'));
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  if (!timeSince) return '';

  const hours = String(Math.floor(timeSince / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeSince % 3600) / 60)).padStart(2, "0");
  const secs = String(timeSince % 60).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
}

export default useTimeSince;
