export const formatDate = (dateString) => {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Format the date and time in IST
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  // Format the date and time
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);

  // Split the formatted date to get day, month, year, and time
  const [weekday, day, month, year, time] = formattedDate.split(" ");

  // Return the final formatted date
  return `${day} ${month} ${year}`;
};
