import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  name?: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  colorDropdown?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const Select = ({
  name,
  options,
  required = false,
  placeholder,
  className = "",
  colorDropdown = "",
  disabled = false,
  value: controlledValue,
  onChange: controlledOnChange,
  ...props
}: SelectProps) => {
  // Conditionally use Formik's useField hook
  const formikContext = name ? useField(name) : [null, null, null];
  const [field, meta, helpers] = formikContext as any;

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hiddenSelectRef = useRef<HTMLSelectElement>(null);

  const currentValue = name ? field?.value : controlledValue;
  const hasValue = !!currentValue;
  const isFloating = isFocused || hasValue;

  const selectedOption = currentValue
    ? options.find((opt) => opt.value === currentValue)
    : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            const option = options[highlightedIndex];
            if (name) {
              helpers.setValue(option.value);
            } else {
              controlledOnChange?.(option.value);
            }
            setIsOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setIsFocused(false);
          break;
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, highlightedIndex, options, name, helpers, controlledOnChange]);

  const handleOptionClick = (value: string) => {
    if (value === "" && placeholder) {
      return;
    }
    if (name) {
      helpers.setValue(value);
    } else {
      controlledOnChange?.(value);
    }
    setIsOpen(false);
    setIsFocused(false);
    if (hiddenSelectRef.current) {
      hiddenSelectRef.current.blur();
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
    if (!isOpen) {
      const currentIndex = currentValue
        ? options.findIndex((opt) => opt.value === currentValue)
        : 0;
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  };

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && dropdownRef.current) {
      const optionElement = dropdownRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="w-full relative">
      <select
        ref={hiddenSelectRef}
        {...(name ? field : {})}
        {...props}
        disabled={disabled}
        id={name}
        aria-label={placeholder || name}
        className="sr-only"
        value={currentValue || ""}
        onChange={(e) => {
          if (name) {
            field.onChange(e);
          } else {
            controlledOnChange?.(e.target.value);
          }
        }}
        onBlur={(e) => {
          if (name) {
            field.onBlur(e);
          }
          props.onBlur?.(e as any);
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={handleToggle}
          onFocus={() => {
            setIsFocused(true);
            props.onFocus?.(props as any);
          }}
          className={`
            w-full h-16 px-[1.88rem] pr-12 rounded-[6.25rem]
            bg-transparent! border
            text-text-primary-100 text-left
            outline-none transition-all duration-400 cursor-pointer
            flex items-center justify-between
            ${
              meta?.touched && meta?.error
                ? "border-red-500!"
                : isFocused || isOpen
                ? "border-text-primary-100!"
                : "border-text-primary-15!"
            }
             ${!currentValue ? "text-text-primary-60" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${className}
          `}
        >
          <span className="truncate">
            {selectedOption
              ? selectedOption.label
              : placeholder || "Select an option"}
          </span>
          <div
            className={`absolute right-[1.88rem] top-1/2 -translate-y-1/2 pointer-events-none text-text-primary-100 transition-transform duration-400 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.89155 7.05806C3.13563 6.81398 3.53136 6.81398 3.77544 7.05806L10.0002 13.2828L16.2249 7.05806C16.469 6.81398 16.8647 6.81398 17.1088 7.05806C17.3528 7.30214 17.3528 7.69786 17.1088 7.94194L10.4421 14.6086C10.3249 14.7258 10.1659 14.7917 10.0002 14.7917C9.83442 14.7917 9.67545 14.7258 9.55824 14.6086L2.89155 7.94194C2.64748 7.69786 2.64748 7.30214 2.89155 7.05806Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className={`absolute z-[99999999999999999999999]! w-full mt-2 ${
              colorDropdown || "bg-white backdrop-blur-xl"
            } rounded-2xl border border-text-primary-15 shadow-lg overflow-hidden max-h-64 overflow-y-auto`}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={`
                  w-full px-[1.88rem] py-4 text-left text-text-primary-100
                  hover:bg-text-primary-15 transition-colors duration-200
                  ${highlightedIndex === index ? "bg-text-primary-15" : ""}
                  ${
                    currentValue === option.value
                      ? "bg-primary/10 text-primary! font-medium"
                      : ""
                  }
                `}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {meta?.touched && meta?.error && (
          <p className="absolute top-full left-0 mt-1 text-sm! text-red-500">
            {meta.error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Select;
