import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ blocks, onNavigate, activeHeadingId }) => {
  const [headings, setHeadings] = useState([]);
  const tocRef = useRef(null);
  const activeItemRef = useRef(null);

  useEffect(() => {
    // Extract headings from blocks
    const extractedHeadings = blocks
      .filter(block => ['heading1', 'heading2', 'heading3'].includes(block.type))
      .map((block, index) => ({
        id: block.id,
        level: parseInt(block.type.replace('heading', '')),
        title: block.content,
        index: index
      }));

    setHeadings(extractedHeadings);
  }, [blocks]);

  // Auto-scroll to active item when activeHeadingId changes
  useEffect(() => {
    if (activeItemRef.current && tocRef.current) {
      const tocElement = tocRef.current;
      const activeElement = activeItemRef.current;
      
      // Calculate the position of the active item relative to the TOC container
      const tocRect = tocElement.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      
      // Calculate how far the active item is from the top of the TOC container
      const scrollTop = tocElement.scrollTop;
      const tocHeight = tocElement.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      
      // Check if the active item is out of view
      if (elementTop < tocElement.scrollTop) {
        // Item is above the visible area, scroll up to it
        tocElement.scrollTop = elementTop - 20; // Add a small offset
      } else if (elementTop + elementHeight > tocElement.scrollTop + tocHeight) {
        // Item is below the visible area, scroll down to it
        tocElement.scrollTop = elementTop - tocHeight + elementHeight + 20;
      }
    }
  }, [activeHeadingId]);

  const handleNavigation = (headingId) => {
    onNavigate(headingId);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div 
      ref={tocRef}
      className="fixed top-[80px] left-4 w-64 bg-card border border-border rounded-lg shadow-lg z-10 max-h-[calc(100vh-120px)] overflow-y-auto"
    >
      <div className="p-4 border-b border-border">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Icon name="List" className="w-4 h-4" />
          Table of Contents
        </h3>
      </div>
      <nav className="py-2">
        <ul className="space-y-1 px-2">
          {headings.map((heading) => (
            <li 
              key={heading.id} 
              ref={activeHeadingId === heading.id ? activeItemRef : null}
            >
              <button
                onClick={() => handleNavigation(heading.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors truncate ${
                  heading.level === 1
                    ? 'font-bold pl-3'
                    : heading.level === 2
                    ? 'pl-6 font-medium'
                    : 'pl-9'
                } ${
                  activeHeadingId === heading.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                title={heading.title}
              >
                {heading.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;