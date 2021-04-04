import Logo from "../assets/logo.svg";
import LoginSignupModal from "./LoginSignupModal";
import { useAuth } from "../backend/auth.js";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../css/navigation.css";

const Navigation = () => {
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('')
  const [userDisplayName, setUserDisplayName] = useState('')
  const history = useHistory();
  

  useEffect(() => {
    if (currentUser && currentUser.displayName !== null) {
      setUserDisplayName(currentUser.displayName);
    } else {
      setUserDisplayName('Anonymous')
    }
    setDropdownValue(userDisplayName)
  }, [currentUser,userDisplayName]);

  async function handleLogout() {
    await logout();
  }

  // dropdown options
  const options = ["Profile", "Log Out"];

  const onSelect = (e) => {
    if (e.value === "Profile") {
      history.push("/profile");
    } else if (e.value === "Log Out") {
      handleLogout();
    }
    setDropdownValue('')
  };

  return (
    <nav>
      <img
        src={Logo}
        style={{
          height: 32,
          width: "auto",
          margin: 4,
          paddingLeft: 15,
          cursor: "pointer",
        }}
        alt="website logo"
        onClick={() => history.push("/")}
      />
      <div className="nav-buttons-container">
        {!currentUser && (
          <button
            className="profile-handler-buttons"
            onClick={() => setShow(true)}
          >
            Log In
          </button>
        )}
        <LoginSignupModal onClose={() => setShow(false)} show={show} />
        {currentUser && (
          <strong>
            <Dropdown
              className="user-dropdown"
              controlClassName="user-dropdown-control"
              options={options}
              onChange={onSelect}
              value={dropdownValue}
              placeholder={userDisplayName}
            />
          </strong>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
