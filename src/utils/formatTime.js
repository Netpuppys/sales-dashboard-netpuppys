export const formatTime = (dateString) => {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Format the date and time in IST
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  // Format the time
  const formattedTime = new Intl.DateTimeFormat("en-IN", options).format(date);

  // Return only the time in the "AM/PM" format
  return formattedTime;
};
