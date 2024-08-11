import React from 'react'
import ReactDOM from 'react-dom/client'
import Menu from '../../components/lateral-menu';
import Header from '../../components/import-cases/header'
import Class from '../../components/import-cases/importCase'

export default function Classes() {
  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          <Header />
          <Class />
        </div>
      </div>

    </>
  )
}