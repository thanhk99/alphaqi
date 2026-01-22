import { apiService } from './api.service';
import { ChartItemResponse } from '@/types/chart.types';
import { ApiResponse } from '@/types/api.types';

export const chartService = {
    getChartItems: async (): Promise<ChartItemResponse[]> => {
        const response = await apiService.get<ChartItemResponse[]>('/chart-items');
        return response.data.data;
    }
};
