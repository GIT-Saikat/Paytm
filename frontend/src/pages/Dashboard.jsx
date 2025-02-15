import React from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'

const Dashboard = () => {
  return (
    <div>
      <div>
        <AppBar></AppBar>
      </div>

      <div className='m-8'>
        <Balance value={"100000"}></Balance>
        <Users></Users>
      </div>

    </div>
  )
}

export default Dashboard