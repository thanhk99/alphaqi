export interface FeaturedPost {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    htmlUrl?: string;
    priority: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}
