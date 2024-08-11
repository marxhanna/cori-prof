import React from 'react'
import ReactDOM from 'react-dom/client'
import Menu from '../../components/lateral-menu';
import Header from '../../components/create-class/header'
import Class from '../../components/create-class/newClass'

export default function Classes() {
  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          <Header />
          <Class />
          <br/><br/>
        </div>
      </div>

    </>
  )
}