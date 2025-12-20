// Course Types
export interface Course {
    id: string;
    title: string;
    description: string;
    content?: string;
    price: number;
    category: string;
    isPublished: boolean;
    isShowHome: boolean;
    averageRating: number;
    reviewCount: number;
    enrollmentCount: number;
    lessonCount: number;
    duration: string;
    thumbnail?: string;
    introVideoUrl?: string;
    instructorName: string;
    createdAt: string;
    updatedAt: string;
    isEnrolled: boolean;
    lessons?: Lesson[];
}

export interface Chapter {
    id: string;
    title: string;
    description?: string;
    courseId: string;
    order: number;
    lessons?: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    description?: string;
    content?: string;
    duration?: number; // in seconds
    chapterId?: string;
    order?: number;
    videoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CourseCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
}



export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    course: Course;
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
    progress: number; // 0-100
    enrolledAt: string;
    completedAt?: string | null;
}

export interface LessonProgress {
    id: string;
    enrollmentId: string;
    lessonId: string;
    completed: boolean;
    lastAccessedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    userId: string;
    userName?: string;
    courseId: string;
    rating: number;
    comment: string;
    user?: {
        fullName: string;
        avatar?: string;
    };
    avatar?: string;
    avatarUrl?: string;
    createdAt: string;
}


