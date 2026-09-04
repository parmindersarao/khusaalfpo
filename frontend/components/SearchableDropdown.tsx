"use client";

import { useEffect, useRef, useState } from "react";

type SearchableDropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
};

export default function SearchableDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  disabled = false,
  loading = false,
  error,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full min-w-0"
    >
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} *
      </label>

      {/* Dropdown Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full min-w-0 border rounded-md px-4 py-2.5 bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 transition ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-green-600"
        } ${
          disabled
            ? "bg-gray-100 cursor-not-allowed text-gray-400"
            : "cursor-pointer"
        }`}
      >
        <span
          className={`truncate ${
            value ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {loading ? "Loading..." : value || placeholder}
        </span>

        <svg
          className={`w-4 h-4 shrink-0 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm mt-1">
          {error}
        </p>
      )}

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-full mt-1 z-100">
          <div className="bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder={`Search ${label.toLowerCase()}...`}
                  autoFocus
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                <svg
                  className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Options */}
            <div className="max-h-60 overflow-y-auto overscroll-contain">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() =>
                      handleSelect(option)
                    }
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-green-50 active:bg-green-100 transition ${
                      value === option
                        ? "bg-green-100 text-green-800 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-500">
                  No results found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}