
import React from 'react';
import './button.css';

type ButtonProps = {
    variant?: 'primary' | 'text';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const Button = ({ className, variant = 'primary', children, onClick }: ButtonProps) => {
    const __className = `button button-${variant} ${className}`;

    return (
        <button className={__className} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
