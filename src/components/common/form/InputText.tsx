import React, { useState } from "react";
import { useField } from "formik";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  required?: boolean;
}

const InputText = ({
  name,
  required = false,
  placeholder,
  className = "",
  disabled = false,
  ...props
}: InputTextProps) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = !!field.value;
  const isFloating = isFocused || hasValue;

  return (
    <div className="w-full relative">
      <input
        {...field}
        {...props}
        disabled={disabled}
        id={name}
        type="text"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          field.onBlur(e);
          props.onBlur?.(e);
        }}
        className={`
            w-full h-16 px-[1.88rem] rounded-[6.25rem]
            bg-transparent! border
            text-text-primary-100 placeholder:text-text-primary-60
            outline-none transition-all duration-400 text-base!
            ${
              meta.touched && meta.error
                ? "border-red-500!"
                : isFocused
                ? "border-text-primary-100!"
                : "border-text-primary-15!"
            }
            ${isFloating ? "pt-5 pb-2" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
          `}
      />
      {placeholder && (
        <label
          htmlFor={name}
          className={`
              absolute left-7.5 transition-all duration-400 pointer-events-none 
              ${
                isFloating
                  ? "top-4.5 text-[0.5625rem]! text-primary!"
                  : "top-1/2 -translate-y-1/2 text-base text-text-primary-60"
              }
            `}
        >
          {placeholder}{" "}
          {required && (
            <span
              className={`${
                isFloating ? "text-primary!" : "text-text-primary-60"
              }`}
            >
              *
            </span>
          )}
        </label>
      )}
      {/* {meta.touched && meta.error && (
          <p className="absolute top-full left-0 mt-1 text-sm! text-red-500">
            {meta.error}
          </p>
        )} */}
    </div>
  );
};

export default InputText;
