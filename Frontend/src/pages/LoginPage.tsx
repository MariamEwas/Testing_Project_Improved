import {Login} from "../components/login";
import "../styles/login.css"
function LoginPage() {
  return (
    <div>
    <header className="login-header">
    <h1 className="title">Personal Finance Tracker</h1>
    <p className="subtitle">Your journey to financial freedom starts here</p>
    </header>
    <div className="login-page-container">
      <Login/>
    </div>
    </div>
  );
}

export default LoginPage;
