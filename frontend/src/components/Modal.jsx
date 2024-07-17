
import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[80rem] rounded-xl shadow-xl flex mx-auto bg-gray-100 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-black">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

