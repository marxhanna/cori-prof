import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Menu from '../../components/lateral-menu';
import img from '../../assets/images/resposta.svg';

export default function Classes() {

  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          <img style={{ width: "100vw", height: "100vh", marginLeft: "-20%" }} src={img} />
        </div>
      </div>
    </>
  )
}
