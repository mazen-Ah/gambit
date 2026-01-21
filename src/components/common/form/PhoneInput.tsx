import React, { useState, useEffect, useRef } from "react";
import { useField, useFormikContext } from "formik";
import Image from "next/image";
import { countriesList } from "@/src/app/utils/countries";

interface PhoneInputProps {
  name: string;
  countryCodeName?: string;
  required?: boolean;
  placeholder?: string;
  colorDropdown?: string;
  disabled?: boolean;
  className?: string;
}

const PhoneInput = ({
  name,
  countryCodeName = "country_code",
  required = false,
  placeholder,
  colorDropdown = "",
  disabled = false,
  className = "",
  ...props
}: PhoneInputProps) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field, meta] = useField(name);
  const [countryField, , countryHelpers] = useField(countryCodeName);
  const [isFocused, setIsFocused] = useState(false);
  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySelectRef = useRef<HTMLDivElement>(null);
  const hiddenCountrySelectRef = useRef<HTMLSelectElement>(null);

  const hasValue = !!field.value;
  const isFloating = isFocused || hasValue;

  const selectedCountry =
    countriesList?.find(
      (country) => String(country.phone_code) === String(countryField.value)
    ) || countriesList.find((c) => c.value === "AE");

  useEffect(() => {
    if (!countryField.value) {
      const defaultCountry = countriesList.find((c) => c.value === "AE");
      if (defaultCountry) {
        setFieldValue(countryCodeName, defaultCountry.phone_code);
      }
    }
  }, [countryCodeName, countryField.value, setFieldValue]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countrySelectRef.current &&
        !countrySelectRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
        setIsCountryFocused(false);
      }
    };

    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isCountryDropdownOpen]);

  // Handle keyboard navigation for country dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCountryDropdownOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < countriesList.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < countriesList.length
          ) {
            const country = countriesList[highlightedIndex];
            countryHelpers.setValue(country.phone_code);
            setIsCountryDropdownOpen(false);
            setIsCountryFocused(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsCountryDropdownOpen(false);
          setIsCountryFocused(false);
          break;
      }
    };

    if (isCountryDropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isCountryDropdownOpen, highlightedIndex, countryHelpers]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (
      isCountryDropdownOpen &&
      highlightedIndex >= 0 &&
      countryDropdownRef.current
    ) {
      const optionElement = countryDropdownRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex, isCountryDropdownOpen]);

  const handleCountryToggle = () => {
    if (disabled) return;
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
    setIsCountryFocused(!isCountryDropdownOpen);
    if (!isCountryDropdownOpen) {
      const currentIndex = countryField.value
        ? countriesList.findIndex(
            (c) => String(c.phone_code) === String(countryField.value)
          )
        : countriesList.findIndex((c) => c.value === "AE");
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    }
  };

  const handleCountrySelect = (phoneCode: string) => {
    countryHelpers.setValue(phoneCode);
    setIsCountryDropdownOpen(false);
    setIsCountryFocused(false);
    if (hiddenCountrySelectRef.current) {
      hiddenCountrySelectRef.current.blur();
    }
  };

  const isFieldFocused = isFocused || isCountryFocused;

  return (
    <div className={`${className} w-full relative`}>
      <div
        className={`
          relative flex items-center h-16 rounded-[6.25rem]
          bg-transparent! border
          transition-all duration-400
          ${
            meta.touched && meta.error
              ? "border-red-500!"
              : isFieldFocused
              ? "border-text-primary-100!"
              : "border-text-primary-15!"
          }
        `}
      >
        {/* Country Code Selector - Nested inside */}
        <div
          ref={countrySelectRef}
          onClick={handleCountryToggle}
          onFocus={() => !disabled && setIsCountryFocused(true)}
          className={`relative flex items-center h-fit p-[0.88rem] ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } border border-text-primary-15 w-32 rounded-full ms-[0.4rem] `}
        >
          {/* Hidden native select for form integration */}
          <select
            aria-label="Select Country"
            ref={hiddenCountrySelectRef}
            value={countryField.value || selectedCountry?.phone_code || ""}
            onChange={(e) => {
              const selected = countriesList.find(
                (country) =>
                  String(country.phone_code) === String(e.target.value)
              );
              if (selected) {
                countryHelpers.setValue(selected.phone_code);
                countryField.onChange(e);
              }
            }}
            onBlur={(e) => {
              countryField.onBlur(e);
            }}
            className="sr-only"
          >
            {countriesList.map((country) => (
              <option key={country.value} value={country.phone_code}>
                {country.phone_code}
              </option>
            ))}
          </select>

          {/* Custom country selector button */}
          <button
            type="button"
            disabled={disabled}
            className={`w-full flex items-center gap-2 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            } outline-none`}
          >
            {selectedCountry && (
              <div className="flex items-center gap-2">
                <Image
                  src={selectedCountry?.flag}
                  alt={selectedCountry?.country?.en}
                  width={20}
                  height={15}
                  className="object-contain"
                />
                <span className="text-text-primary-100 text-sm">
                  +{selectedCountry.phone_code}
                </span>
              </div>
            )}
          </button>

          {/* Chevron icon */}
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-primary-100 transition-transform duration-400 ${
              isCountryDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
            >
              <path
                d="M1.69189 1.3335L5.50019 6.87284L9.30849 1.3335H1.69189Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Custom Country Dropdown Menu */}
          {isCountryDropdownOpen && (
            <div
              ref={countryDropdownRef}
              className={`absolute z-50 top-full left-0 mt-2 w-80 ${
                colorDropdown || "bg-white backdrop-blur-xl"
              } rounded-2xl border border-text-primary-15 shadow-lg overflow-hidden max-h-64 overflow-y-auto`}
            >
              {countriesList.map((country, index) => (
                <button
                  key={country.value}
                  type="button"
                  onClick={() => handleCountrySelect(country.phone_code)}
                  className={`
                    w-full px-4 py-3 text-left flex items-center gap-3
                    hover:bg-text-primary-15 transition-colors duration-200
                    ${highlightedIndex === index ? "bg-text-primary-15" : ""}
                    ${
                      String(countryField.value) === String(country.phone_code)
                        ? "bg-primary/10"
                        : ""
                    }
                  `}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <Image
                    src={country.flag}
                    alt={country.country.en}
                    width={24}
                    height={18}
                    className="object-contain shrink-0"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-text-primary-100 text-sm">
                      {country.country.en}
                    </span>
                    <span className="text-text-primary-100 text-sm font-medium">
                      +{country.phone_code}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="relative flex-1 h-full">
          <input
            {...field}
            {...props}
            id={name}
            disabled={disabled}
            type="tel"
            pattern="[0-9]*"
            inputMode="numeric"
            onFocus={(e) => {
              if (disabled) return;
              setIsFocused(true);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur(e);
            }}
            onChange={(e) => {
              if (disabled) return;
              // Only allow digits
              const value = e.target.value.replace(/\D/g, "");
              setFieldValue(name, value);
            }}
            className={`
              w-full h-full ps-5 pe-[0.62rem] bg-transparent!
              text-text-primary-100 placeholder:text-text-primary-60
              outline-none transition-all duration-400 rounded-e-full bg-transparent!
              ${isFloating ? "pt-5 pb-2" : ""}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          />
          {placeholder && (
            <label
              htmlFor={name}
              className={`
                absolute left-5 transition-all duration-400 pointer-events-none
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
        </div>
        {/* {meta.touched && meta.error && (
          <p className="absolute top-full left-0 mt-1 text-sm! text-red-500">
            {meta.error}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default PhoneInput;
