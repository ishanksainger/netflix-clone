import React from 'react'

const IconBtn = ({ text, onClick,customClasses, type}) => {

  return (
    <button onClick={onClick} type={type} className={`bg-[#E50913] p-3 cursor-pointer text-white font-bold  ${customClasses}`}>
      <span className='text-base'>{text}</span>
    </button>
  )
}

export default IconBtn