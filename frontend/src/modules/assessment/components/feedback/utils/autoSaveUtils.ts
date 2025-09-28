export type AutoSaveStatus = "typing" | "saving" | "saved" | "error";

export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
export const TYPING_DEBOUNCE = 1000; // 1 second

export function getAutoSaveStatusColor(status: AutoSaveStatus): string {
  switch (status) {
    case "typing":
      return "text-yellow-600";
    case "saving":
      return "text-blue-600";
    case "saved":
      return "text-green-600";
    case "error":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export function getAutoSaveStatusText(status: AutoSaveStatus): string {
  switch (status) {
    case "typing":
      return "Typing...";
    case "saving":
      return "Saving...";
    case "saved":
      return "Saved";
    case "error":
      return "Save failed";
    default:
      return "Draft";
  }
}