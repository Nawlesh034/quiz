import { useState } from 'react'

import Navbar from './Navbar/Navbar'
import Hero from './Main-Section/Hero'

function App() {
 

  return (
    <>
      <Navbar/>
      <div className='flex flex-col justify-center items-center'>
      <Hero/>
      </div>
    </>
  )
}

export default App
