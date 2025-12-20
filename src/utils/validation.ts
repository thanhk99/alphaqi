// Validation utilities
export const validation = {
    email: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    password: (password: string): { valid: boolean; message?: string } => {
        if (password.length < 8) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 8 ký tự' };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 1 chữ hoa' };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 1 chữ thường' };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 1 số' };
        }
        return { valid: true };
    },

    phone: (phone: string): boolean => {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    },

    required: (value: string): boolean => {
        return value.trim().length > 0;
    }
};
