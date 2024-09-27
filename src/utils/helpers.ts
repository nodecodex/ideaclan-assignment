import moment from "moment";
import { v4 as uuidv4 } from "uuid";

/**
 * Converts a File object into a Blob URL.
 * @param {File} file - The file to be converted into a Blob URL.
 * @returns {string} - The Blob URL.
 */
export const convertFileToBlobUrl = (file: File): string => {
  if (!file) {
    throw new Error("No file provided");
  }
  return URL.createObjectURL(file);
};

export function generateUID(): string {
  return uuidv4();
}

export function formatDateWithMoment(isoDate: string): string {
  const date = moment(isoDate);
  return date.format("DD/MM/YYYY");
}
