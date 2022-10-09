import { authApiClient } from 'lib/fetch';

export const url = (reportId) => `/api/admin/reports/${reportId}/resolve`;

const resolveReport = (reportId, status) =>
  authApiClient.put(url(reportId), {
    status,
  });

export default resolveReport;
