import { useState } from "react";

type InputCardProps = {
  title: string;
  dropdownValues: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

function InputCard({ title, dropdownValues, defaultValue, onChange }: InputCardProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || dropdownValues[0]?.value || "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      >
        {dropdownValues.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputCard;