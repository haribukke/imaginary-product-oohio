import React from 'react';
import Icon from '../../../components/AppIcon';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-card border border-border rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="X" className="w-5 h-5" />
        </button>
        <div className="p-6">
          <div className="text-foreground">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
