import { showToast } from "./global-toast";

export const handleApiError = (error: any, customMessage?: string) => {
  console.log("API Error:", error);

  // Try to extract message dynamically
  const message =
    error?.response?.data?.message || // API response message
    error?.data?.message || // RTK Query error format
    error?.message || // JS error message
    "Something went wrong. Please try again."; // Default fallback

  // Optional: check if error.ok property exists (for fetch-style responses)
  const isOk = error?.ok ?? false;

  if (!isOk) {
    showToast.error(message, customMessage);
  } else {
    showToast.error("Unexpected error occurred.");
  }
};
