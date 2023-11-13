import { InputHTMLAttributes, RefObject } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    label?: string;
    htmlType?: string;
    error?: string;
    value?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    options?: {
        value: string;
        label: string;
    }[];
    pattern?: string;
    isError?: boolean;
    inputRef?: RefObject<HTMLInputElement>;
    MaxLength?: number;
    hidden?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    type?: string;
    success?: boolean;
    defaultValue?: string;
}

export default function Input({
    label,
    className,
    htmlType,
    error,
    value,
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
    options,
    pattern,
    isError,
    inputRef,
    MaxLength,
    hidden,
    disabled,
    required,
    name,
    id,
    type,
    success,
    defaultValue,
}: InputProps) {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{label}
            </label>
            <input
                type={htmlType}
                name={name}
                id={id}
                className={twMerge("bg-[#43366A] border border-gray-500 text-white text-sm rounded-lg  block w-full p-2.5", className)}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                value={value}
                ref={inputRef}
                pattern={pattern}
                maxLength={MaxLength}
                required
            />
            {error && (
                <p className="mt-2 text-xs text-red-600">
                    <span className="font-medium">{error}</span>
                </p>
            )}
        </div>
    );
}
