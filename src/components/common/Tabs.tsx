"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";

// TypeScript interfaces
interface Tab {
  id: string;
  label: string;
  color: string;
}

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tab: Tab) => void;
  actionButton?: ActionButton;
  className?: string;
}

const Tabs = ({
  tabs = [],
  defaultTab,
  onTabChange,
  actionButton,
  className = "",
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [selectorStyle, setSelectorStyle] = useState({});
  const tabRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Update selector position when active tab changes
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setSelectorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeTab]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.id);
    onTabChange?.(tab);
  };

  const activeTabColor =
    tabs.find((tab) => tab.id === activeTab)?.color || "#CF0F69";

  return (
    <div
      className={`overflow-x-auto scrollbar-hide px-10 -mx-10 py-4 -my-4 ${className}`}
    >
      <div
        className={`inline-flex w-fit items-center gap-7 max-sm:gap-4 p-[0.4375em] rounded-full border border-text-primary-100/15 bg-[#ece3ed]`}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="relative flex items-center justify-center pr-2"
            role="tablist"
          >
            <div
              className="absolute top-0 bottom-0 rounded-full transition-all duration-500 ease-out pointer-events-none"
              style={{
                ...selectorStyle,
                backgroundColor: activeTabColor,
                zIndex: 0,
              }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el:any) => {
                  tabRefs.current[tab.id] = el;
                }}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => handleTabClick(tab)}
                className={`
                  relative px-7 max-sm:px-4 max-sm:py-2.75 py-2.75 text-nowrap cursor-pointer transition-all duration-400
                  ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-text-primary-100 hover:opacity-70"
                  }
                `}
                style={{ zIndex: 1 }}
              >
                <strong className="font-semibold text-base capitalize">{tab.label}</strong>
              </button>
            ))}

            {actionButton && (
              <div
                className="absolute top-2 bottom-2 right-0 w-px bg-text-primary-100/15"
                style={{ zIndex: 1 }}
              />
            )}
          </div>
        </div>

        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-full border border-text-primary-100/15 hover:bg-text-primary-100/5 transition-colors whitespace-nowrap"
          >
            {actionButton.icon && (
              <span className="w-4 h-4 flex items-center justify-center">
                {actionButton.icon}
              </span>
            )}
            <span className="text-xs font-semibold uppercase tracking-wider relative top-[0.1em] max-sm:hidden">
              {actionButton.label}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Tabs;
