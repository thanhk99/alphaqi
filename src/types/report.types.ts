export type ReportType = 'MACRO' | 'INVESTMENT_STRATEGY' | 'COMPANY_INDUSTRY' | 'ASSET_MANAGEMENT' | 'CIO_REPORT';

export interface Report {
    id: number;
    title: string;
    description: string;
    type: ReportType;
    typeDisplayName: string;
    pdfUrl: string;
    externalLink: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ReportListParams {
    type?: ReportType;
    keyword?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    size?: number;
    sort?: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface ReportResponseData {
    reports: PaginatedResponse<Report>;
    latestUpdatedAt: string;
}
