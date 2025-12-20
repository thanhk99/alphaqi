export type ArticleType = 'EXTERNAL' | 'INTERNAL';

export interface Article {
    id: string;
    title: string;
    description: string;
    link?: string;
    content?: string;
    type: ArticleType;
    thumbnail: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ArticleRequest {
    title: string;
    description: string;
    link?: string;
    content?: string;
    type: ArticleType;
    thumbnail: string;
    isPublished?: boolean;
}
