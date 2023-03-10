import { useTimeAgo } from "@vueuse/core";

export default function dateFormat() {
  const getAgoTime = (date: Date) => {
    return useTimeAgo(date);
  };

  return { getAgoTime };
}
