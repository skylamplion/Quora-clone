import React from 'react';
import "./css/Quora.css"
import QuoraHeader from './QuoraHeader'
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import Feed from './Feed';



const Quora = () => {
  return (
    <div className='quora'>
      <QuoraHeader />
      <div className='quora__contents'>
        <div className="quora__content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  )
}


export default Quora
