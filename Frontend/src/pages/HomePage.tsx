import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
        <h1>Home</h1>
        <Link to="/transactions">Transactions</Link> 
        <br/>
        <Link to="/recommendations">Recommendations</Link>   
        <br/>
        <Link to="/dashboard">Dashboard</Link>  
        {/* we want a logout button  which will navigate us to the login page again*/}

        <p>Love You ❤️❤️😉</p>
    </div>
  )
}

export default HomePage
