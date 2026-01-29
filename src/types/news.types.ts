// News Types
export interface News {
    id: string;
    title: string;
    description: string;
    content?: string;
    thumbnail: string;
    type: string;
    isPublished: boolean;
    isShowHome: boolean;
    createdAt: string;
    updatedAt: string;
}
