import React from 'react'

function Button({
  children,
  type = "text",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  classname = "",
  ...props
  }) 
{
  return (
    <button className={`py-4 px-4 rounded-lg ${classname} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  )
}

export default Button
