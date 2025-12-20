/**
 * List of domains/patterns that are known to block hotlinking or require authentication
 */
const BLOCKED_IMAGE_PATTERNS = [
    'shutterstock.com/search',
    'gettyimages.com/search',
    'istockphoto.com/search',
];

/**
 * Check if an image URL is likely to be blocked
 */
function isLikelyBlocked(url: string): boolean {
    return BLOCKED_IMAGE_PATTERNS.some(pattern => url.includes(pattern));
}

/**
 * Get the full URL for an image from the backend
 * @param imagePath - The image path returned from the API (can be null, relative, or absolute)
 * @returns Full URL to the image or a placeholder
 */
export function getImageUrl(imagePath: string | null | undefined): string {
    // If no image path, return placeholder
    if (!imagePath) {
        return getPlaceholderImage();
    }

    if (imagePath.startsWith('data:')) {
        return imagePath;
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        if (isLikelyBlocked(imagePath)) {
            console.warn(`Blocked image URL detected: ${imagePath}`);
            return getPlaceholderImage();
        }
        return imagePath;
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `${API_BASE_URL}${normalizedPath}`;
}

export function getPlaceholderImage(text: string = 'Khóa học'): string {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;
}

export function getUnsplashPlaceholder(query: string = 'finance', width: number = 800, height: number = 600): string {
    return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`;
}
