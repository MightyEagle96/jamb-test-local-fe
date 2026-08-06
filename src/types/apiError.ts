import { AxiosError } from "axios";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: unknown;
}

export type ApiAxiosError = AxiosError<ApiErrorResponse>;

export interface IUploadResponse {
  fileType: string;
  fileUrl: string;
  fileName: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
}
