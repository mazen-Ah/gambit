import React, { useState } from "react";
import { useField } from "formik";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  required?: boolean;
  label?: string;
}

const Textarea = ({
  name,
  required = false,
  placeholder,
  label,
  className = "",
  rows = 6,
  disabled = false,
  ...props
}: TextareaProps) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = !!field.value;
  const isFloating = isFocused || hasValue;
  const displayLabel = label || placeholder;

  return (
    <div className="w-full relative">
      <div className="relative">
        <textarea
          {...field}
          {...props}
          disabled={disabled}
          id={name}
          rows={rows}
          placeholder={isFloating ? placeholder : ""}
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
            w-full min-h-16 px-[1.88rem] py-[1.88rem] rounded-2xl
            bg-transparent! border
            text-text-primary-100 placeholder:text-text-primary-60
            outline-none transition-all duration-400 resize-none
            ${
              meta.touched && meta.error
                ? "border-red-500!"
                : isFocused
                ? "border-text-primary-100!"
                : "border-text-primary-15!"
            }
            ${isFloating ? "pt-10 pb-4" : "pt-7 pb-4"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
          `}
        />
        {displayLabel && (
          <label
            htmlFor={name}
            className={`
              absolute left-[1.88rem] transition-all duration-400 pointer-events-none
              ${
                isFloating
                  ? "top-3.5 text-[0.5625rem]! text-primary!"
                  : "top-6 text-base text-text-primary-60"
              }
            `}
          >
            {displayLabel}{" "}
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
          <p className="absolute bottom-0 left-0 translate-y-full mt-1 text-sm! text-red-500">
            {meta.error}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Textarea;
