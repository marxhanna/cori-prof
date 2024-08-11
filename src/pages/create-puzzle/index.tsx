import React from 'react'
import ReactDOM from 'react-dom/client'
import Menu from '../../components/lateral-menu';
import Header from '../../components/create-puzzle/header'
import Puzzle from '../../components/create-puzzle/puzzle'

export default function Classes() {
  return (
    <>
      <div className='page'>
        <div className='pageContent'>
          <Header />
          <Puzzle />
          <br/><br/>
        </div>
      </div>

    </>
  )
}