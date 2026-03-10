import apiClient from "../lib/api-client";

export interface ReportParams {
  type: string;
  dateFrom: string;
  dateTo: string;
  departmentId?: string;
}

export interface ReportResponse {
  id: string;
  type: string;
  status: string;
  url?: string;
  createdAt: string;
}

export const reportsService = {
  generate: async (params: ReportParams) => {
    const { data } = await apiClient.post<ReportResponse>("/reports/generate", params);
    return data;
  },
};
