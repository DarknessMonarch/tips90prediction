"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "@/app/styles/accountDropdown.module.css";
import { RiArrowDropDownLine as DropdownIcon } from "react-icons/ri";

export default function AccountDropdown({ options, value, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const DropdownPortal = () => {
    if (!isOpen) return null;
    
    return createPortal(
      <div 
        className={styles.dropdownPortal}
        style={{
          
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          zIndex: 9999,
          borderRadius: '10px',
          color: 'var(--light-color)',
          backgroundColor: 'var(--primary-light-color)',
          fontFamily: 'var(--font-poppins-light)',
          border: '1px solid var(--line-color)',
          padding: '5px',
          maxHeight: '200px',
          overflowY: 'auto'
        }}
      >
        {options && options.length > 0 && options.map((option, index) => (
          <div 
            key={index} 
            onClick={() => handleSelect(option)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'all 0.2s',
              color: 'var(--light-color)'
            }}
            className={styles.dropdownOption}
          >
            {option}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <div
          className={styles.dropdownInput}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value || "Select Plan"}</span>
          <DropdownIcon className={styles.dropdownIcon} aria-label="Dropdown icon" />
        </div>
      </div>
      <DropdownPortal />
    </>
  );
}