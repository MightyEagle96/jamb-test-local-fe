import { toast } from "sonner";
import type { ApiAxiosError } from "../types/apiError";

export const toastError = (error: unknown) => {
  const axiosError = error as ApiAxiosError;

  if (axiosError.response?.data?.message) {
    toast.error(axiosError.response.data.message);
    return;
  }

  if (axiosError.message) {
    toast.error(axiosError.message);
    return;
  }

  toast.error((error as string) || "Something went wrong. Please try again.");
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
