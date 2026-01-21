"use client";

import { useField, useFormikContext } from "formik";
import React, { useRef, useEffect } from "react";
import { CloseIcon } from "../../Icons";

interface FileInputProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  disabled?: boolean;
}

const FileInput = ({
  name,
  label = "Upload CV",
  required = false,
  accept = ".pdf,.doc,.docx",
  disabled = false,
}: FileInputProps) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!field.value && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [field.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.currentTarget.files?.[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setFieldValue(name, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasError = meta.touched && meta.error;
  const hasValue = !!field.value;
  const fileName = field.value?.name;

  return (
    <div className="w-full relative">
      <input
        ref={fileInputRef}
        type="file"
        disabled={disabled}
        id={name}
        name={name}
        className="hidden"
        accept={accept}
        onChange={handleChange}
        onBlur={field.onBlur}
      />
      <label
        htmlFor={name}
        className={`
          w-full h-16 px-[1.88rem] rounded-[6.25rem] bg-transparent border flex items-center justify-between transition-colors duration-400
          ${
            hasError
              ? "border-red-500!"
              : "border-text-primary-15 hover:border-text-primary-30"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span
            className={`truncate text-base! font-[400]! ${
              hasValue ? "text-text-primary-100" : "text-text-primary-100"
            }`}
          >
            {hasValue ? fileName : label}
          </span>
          {required && !hasValue && (
            <span className="text-text-primary-60">*</span>
          )}
        </div>

        {hasValue ? (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleClear}
              className={`p-2 ${
                disabled ? "cursor-not-allowed" : "hover:bg-black/5"
              } rounded-full transition-colors`}
              disabled={disabled}
            >
              <div className="w-3 h-3 [&>svg]:w-full [&>svg]:h-full text-text-primary-60">
                <CloseIcon />
              </div>
            </button>
            <span
              className={`px-4 py-1.5 rounded-full bg-text-primary-10 text-xs text-text-primary-100 font-medium ${
                disabled ? "opacity-50" : ""
              }`}
            >
              Change
            </span>
          </div>
        ) : (
          <span
            className={`px-4 py-[0.68rem] rounded-full border border-text-primary-15 text-base text-text-primary-100 shrink-0 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            Browse files
          </span>
        )}
      </label>
      {/* {hasError && (
        <p className="absolute top-full left-6 mt-1 text-sm text-red-500">
          {meta.error}
        </p>
      )} */}
    </div>
  );
};

export default FileInput;
