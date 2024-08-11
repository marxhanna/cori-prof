import React from 'react'
import ReactDOM from 'react-dom/client'
import Menu from '../../components/lateral-menu';
import Header from '../../components/create-case/header'
import Class from '../../components/create-case/case'

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