import React, { useState } from 'react'
import Navigator from './Navigator'
import Movies from './Movies/Movies'
import Series from './Series/Series'

const Dashboard = () => {
  const [isActive, setIsActive] = useState('movie')

  return (
    <div className='h-full w-full p-[2%]'>
      <Navigator setIsActive={setIsActive} isActive={isActive} />
      {isActive === 'movie' && <Movies />}
      {isActive === 'serie' && <Series />}
    </div>
  )
}

export default Dashboard