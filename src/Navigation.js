import Logo from "./assets/logo.svg"
import { Link } from 'react-router-dom'
import { useAuth } from './auth.js'

const Navigation = () => {
  const { logout } = useAuth()
  const { currentUser } = useAuth()

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
      <div className="profile-buttons" style={{display: 'flex'}}>
      {currentUser && <div>You are logged in as: {currentUser.email}</div>}
      <Link to="/profile"><button>Profile</button></Link>
      <button onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navigation;
