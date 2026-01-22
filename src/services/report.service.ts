import axios from 'axios';
import apiClient, { apiService } from './api.service';
import { Report, ReportType, ReportListParams, PaginatedResponse, ReportResponseData } from '@/types/report.types';

export const reportService = {
    getReports: async (params: ReportListParams): Promise<PaginatedResponse<Report>> => {
        const response = await apiService.get<any>('/reports', { params });
        // Priority 1: New nested structure
        if (response.data?.data?.reports?.content) {
            return response.data.data.reports;
        }
        // Priority 2: Direct paginated structure
        if (response.data?.data?.content) {
            return response.data.data;
        }
        // Fallback: Return empty structure to prevent UI crash
        return {
            content: [],
            totalPages: 0,
            totalElements: 0,
            size: params.size || 10,
            number: 0
        };
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
