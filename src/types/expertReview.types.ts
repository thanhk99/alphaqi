// Expert Review Types
export interface ExpertReview {
    id: string;
    expertName: string;
    expertTitle: string;
    expertAvatar?: string;
    content: string;
    rating: number;
    courseId: string;
    courseName: string;
    createdAt: string;
    updatedAt: string;
}
