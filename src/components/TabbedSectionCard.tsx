import { useState } from "react";

type Tab = {
  id: string;
  label: string;
};

type TabbedSectionCardProps = {
  tabs: Tab[];
  sections: Record<string, React.ReactNode>;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
};

function TabbedSectionCard({ tabs, sections, defaultTab, onTabChange }: TabbedSectionCardProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 flex flex-col h-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-900 border-b-2 border-blue-900 bg-blue-50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 flex-grow overflow-hidden">
        {sections[activeTab]}
      </div>
    </div>
  );
}

export default TabbedSectionCard;