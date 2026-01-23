import axios from 'axios';
import apiClient, { apiService } from './api.service';
import { Report, ReportType, ReportListParams, PaginatedResponse, ReportResponseData, ReportTypeInfo } from '@/types/report.types';

export const reportService = {
    getReports: async (params: ReportListParams): Promise<ReportResponseData> => {
        const response = await apiService.get<ReportResponseData>('/reports', { params });
        return response.data.data;
    },

    getReportById: async (id: number): Promise<Report> => {
        const response = await apiService.get<Report>(`/reports/${id}`);
        return response.data.data;
    },

    downloadReport: async (url: string, title: string) => {
        try {
            const isApiRoute = url.startsWith('/api');
            let blob: Blob;

            if (isApiRoute) {
                const response = await apiClient.get(url, { responseType: 'blob' });
                blob = new Blob([response.data]);
            } else {
                // Try to fetch the file to create a blob for download
                // This allows us to set the filename
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
                blob = await response.blob();
            }

            // Create blob link to download
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${title}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download init failed:', error);
            throw error;
        }
    }
};
