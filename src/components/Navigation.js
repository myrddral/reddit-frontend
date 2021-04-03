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
  const history = useHistory();
  const [dropdownValue, setDropdownValue] = useState('')

  const returnUsername = () => {
    if (currentUser && currentUser.displayName !== null) {
      return currentUser.displayName;
    } else {
      return "anonymous";
    }
  };

  useEffect(() => {
    setDropdownValue(`${returnUsername()}`)
  }, []);

  async function handleLogout() {
    await logout();
  }

  // dropdown options
  const options = ["Profile", "Log Out"];

  const onSelect = (e) => {
    if (e.value === "Profile") {
      console.log(dropdownValue);
      history.push("/profile");
    } else if (e.value === "Log Out") {
      handleLogout();
    }
    setDropdownValue(`${returnUsername()}`)
    console.log(dropdownValue);
  };

  console.log(dropdownValue);
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
              placeholder="Select an option"
            />
          </strong>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
