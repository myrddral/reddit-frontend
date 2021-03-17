import Logo from "./assets/logo.svg"
import LoginSignupModal from './LoginSignupModal'
import { Link } from 'react-router-dom'
import { useAuth } from './auth.js'
import { useState } from "react";
import './navigation.css'

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
      {currentUser && <div className="loggedin-user-email">You are logged in as
      {currentUser.displayName !== null && <strong> {currentUser.displayName}</strong>}
      {currentUser.displayName === null && <strong> anonymous</strong>}
      
      </div>}
      {currentUser && <Link to="/profile"><button className="profile-handler-buttons">Profile</button></Link>}
      {currentUser && <button className="profile-handler-buttons" onClick={handleLogout}>Log Out</button>}
      {!currentUser && <button className="profile-handler-buttons" onClick={() => setShow(true)}>Log In</button>}
      <LoginSignupModal onClose={() => setShow(false)} show={show}/>
      </div>
    </nav>
  );
};

export default Navigation;
