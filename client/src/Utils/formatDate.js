import {
  format,
  differenceInMinutes,
  differenceInSeconds,
  differenceInHours,
  differenceInDays,
} from "date-fns";

const formatDate = (date) => {
  const now = new Date();
  const hoursDiff = differenceInHours(now, new Date(date));
  const daysDiff = differenceInDays(now, new Date(date));

  if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  } else if (daysDiff > 1 && daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else {
    return format(new Date(date), "EEE d LLL, yyyy");
  }
};

export { formatDate };
