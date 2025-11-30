import React, { useState } from "react";

const DropdownSearch = ({
  options,
  placeholder = "Search...",
  onOptionSelect,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.label); // Show the selected option in the input
    setIsOpen(false);
    onOptionSelect(option);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          placeholder={placeholder}
          className={`flex-1 px-3 py-2 text-gray-700 bg-white border-none rounded-md focus:outline-none ${
            disabled && "bg-gray-300"
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
        />
        <button
          type="button"
          className="px-3 py-2 text-gray-500"
          onClick={() => {
            if (disabled) {
              return;
            }
            setIsOpen(!isOpen);
          }}
        >
          ▼
        </button>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto">
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((option) => (
              <li
                key={option.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSearch;
