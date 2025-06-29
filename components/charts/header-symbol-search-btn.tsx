import React, { useState } from 'react';
import SymbolSearchPopup from '../symbol-search-popup';
import { HiMagnifyingGlass } from "react-icons/hi2";

const HeaderSymbolSearchBtn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: '8px',
          transition: 'background 0.2s',
        }}
        onClick={() => setIsOpen(true)}
        aria-label="Open Symbol Search"
      >
        <HiMagnifyingGlass style={{ fontSize: '1.2rem' }} />
        <span>Symbol</span>
      </button>
      <SymbolSearchPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default HeaderSymbolSearchBtn; 