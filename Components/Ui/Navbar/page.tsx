import React from 'react'
import './navbar.css'
interface PageProps {
  className?: string;
}
const page:React.FC<PageProps> = ({ className })=> {
  return (
    <>
    <div className="navbar">
       <div className="navbar-logo">
           <h1>INCLUSIFY</h1>
       </div>
       <div className="menu">
          <h1>Menu</h1>
       </div>
    </div>
       
    </>
  )
}

export default page
