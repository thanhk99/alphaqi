import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, fullWidth = false, className = '', type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPasswordField = type === 'password';
        const inputType = isPasswordField && showPassword ? 'text' : type;

        const inputClass = [
            styles.input,
            error ? styles.error : '',
            fullWidth ? styles.fullWidth : '',
            isPasswordField ? styles.hasIcon : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''}`}>
                {label && (
                    <label className={styles.label} htmlFor={props.id}>
                        {label}
                        {props.required && <span className={styles.required}>*</span>}
                    </label>
                )}
                <div className={styles.inputContainer}>
                    <input ref={ref} className={inputClass} type={inputType} {...props} />
                    {isPasswordField && (
                        <button
                            type="button"
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </button>
                    )}
                </div>
                {error && <span className={styles.errorText}>{error}</span>}
                {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
