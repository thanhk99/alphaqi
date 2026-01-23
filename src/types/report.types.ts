export type ReportType =
    | 'MACRO' | 'MACRO_MONEY_MARKET_BOND' | 'MACRO_TOPICAL'
    | 'COMPANY_INDUSTRY' | 'COMPANY' | 'SECTOR'
    | 'ASSET_MANAGEMENT' | 'ASSET_ALLOCATION' | 'WEALTH_MANAGEMENT_TOPICAL'
    | 'INVESTMENT_STRATEGY' | 'CIO_REPORT';

export interface Report {
    id: number;
    title: string;
    description: string;
    type: ReportType;
    typeDisplayName: string;
    parentType: string | null;
    parentTypeDisplayName: string | null;
    pdfUrl: string;
    externalLink: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ReportTypeInfo {
    code: string;
    displayName: string;
}

export interface ReportListParams {
    type?: string;
    search?: string;
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
