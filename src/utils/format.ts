// Format utilities
export const format = {
    currency: (amount: number, currency: string = 'VND'): string => {
        if (currency === 'VND') {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    date: (date: string | Date): string => {
        const d = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(d);
    },

    dateTime: (date: string | Date): string => {
        const d = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(d);
    },

    duration: (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    },

    number: (num: number): string => {
        return new Intl.NumberFormat('vi-VN').format(num);
    }
};
