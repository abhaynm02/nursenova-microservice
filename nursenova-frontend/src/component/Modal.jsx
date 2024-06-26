import React from 'react'
import { X } from 'lucide-react'

const Modal = ({isVisible,onClose,children}) => {
    if(!isVisible){
        return null;
    }
    const handleClose=(e)=>{
        if(e.target.id ==='wrapper'){
            onClose();
        }
    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20' id='wrapper' onClick={handleClose}>
       <div className='w-auto sm:w-[500px] flex flex-col'>
        <button onClick={onClose} className='text-white text-xl place-self-end' ><X></X></button>
        <div className='bg-white p-2 rounded'>
          {children}

        </div>

       </div>
      
    </div>
  )
}

export default Modal
