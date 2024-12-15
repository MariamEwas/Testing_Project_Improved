import React from 'react'
import  {Link} from 'react-router-dom'

const LoginPage = () => {
  return (
    <div>
      <h1>Hello from LoginPage</h1>
      <Link to="/home">Home</Link>   
      {/* implement the code of the login and we want a button for register ,too */}
    </div>
  )
}

export default LoginPage
