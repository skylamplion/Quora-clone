import React from 'react';
import "./css/Sidebar.css";
import { HiPlus } from "react-icons/hi"
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <SidebarOption />
    </div>
  )
}


function SidebarOption() {
  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>History</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />

        <p>Business</p>
      </div>
      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Psychology</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Cooking</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Music</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Science</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Health</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Movies</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Technology</p>
      </div>

      <div className="sidebarOption">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/640px-Sign-check-icon.png"
          alt=""
        />
        <p>Education</p>
      </div>
      <div className="sidebarAddOption">
      <p> <HiPlus/></p>
        <p className="text"> Discover <br/>Spaces</p>
      </div>
    </div>
  )
}
export default Sidebar
