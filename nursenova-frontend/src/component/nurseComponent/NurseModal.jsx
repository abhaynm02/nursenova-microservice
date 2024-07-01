import React from 'react'

const NurseModal =  ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    
    const handleClose=(e)=>{
        if(e.target.id ==='wrapper'){
            onClose();
        }}
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" id='wrapper' onClick={handleClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 md:mx-auto animate-fadeIn">
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

export default NurseModal
