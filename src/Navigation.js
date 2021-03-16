import Logo from "./assets/logo.svg"
import LoginSugnupModal from './LoginSignupModal'
import { Link } from 'react-router-dom'
import { useAuth } from './auth.js'
import { useState } from "react";

const Navigation = () => {
  const { logout } = useAuth()
  const { currentUser } = useAuth()
  const [show, setShow] = useState(false)

  async function handleLogout() {
    await logout()
  }

  return (
    <nav>
      <img
        src={Logo}
        style={{ height: 32, width: "auto", margin: 4, paddingLeft: 15 }}
        alt="website logo"
      />
      <div className="nav-buttons-container">
      {currentUser && <div className="loggedin-user-email">You are logged in,
      {currentUser.displayName !== null && <span> {currentUser.displayName}</span>}
      {currentUser.displayName === null && <span>anonymous</span>}
      
      </div>}
      {currentUser && <Link to="/profile"><button>Profile</button></Link>}
      {currentUser && <button onClick={handleLogout}>Log Out</button>}
      {!currentUser && <button onClick={() => setShow(true)}>Log In</button>}
      <LoginSugnupModal onClose={() => setShow(false)} show={show}/>
      </div>
    </nav>
  );
};

export default Navigation;
