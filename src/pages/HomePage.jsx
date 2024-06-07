import React from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts'

const HomePage = () => {
  return (
    <div className='column'>
      <Header/>
      <Posts/>
    </div>
  )
}

export default HomePage