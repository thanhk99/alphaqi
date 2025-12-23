import { apiService } from './api.service';
import { PartnerCompany } from '@/types/partnerCompany.types';

const partnerCompanyService = {
    getPartnerCompanies: async (): Promise<PartnerCompany[]> => {
        try {
            const response = await apiService.get<PartnerCompany[]>('/partner-companies');
            return response.data.data;
        } catch (error) {
            console.error('Error fetching partner companies:', error);
            throw error;
        }
    },
};

export default partnerCompanyService;
