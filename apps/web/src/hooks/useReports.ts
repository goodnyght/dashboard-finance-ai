import { useMutation } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import type { ReportParams } from "../services/reports.service";

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: (params: ReportParams) => reportsService.generate(params),
  });
};
