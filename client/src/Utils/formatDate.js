import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInCalendarMonths,
  differenceInDays,
  differenceInYears,
} from "date-fns";

const formatDate = (date) => {
  const now = new Date();
  const diffMinutes = differenceInMinutes(now, new Date(date));
  const diffHours = differenceInHours(now, new Date(date));
  const diffDays = differenceInDays(now, new Date(date));
  const diffMonths = differenceInCalendarMonths(now, new Date(date));
  const diffYears = differenceInYears(now, new Date(date));

  switch (true) {
    case diffMinutes < 1:
      return "a few seconds ago";
    case diffMinutes < 60:
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    case diffHours < 24:
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    case diffDays < 30:
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    case diffMonths < 12:
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    case diffYears > 0:
      return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
    default:
      return format(new Date(date), "d LLL, yyyy");
  }
};

export { formatDate };
