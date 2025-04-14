export const formatINRRange = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/inr_/gi, "") // Remove all 'inr_' (case-insensitive)
    .replace(/_/g, " ") // Replace all underscores with space
    .trim(); // Remove leading/trailing spaces
};
