import "../css/profile.css";
import { useAuth } from "../backend/auth.js";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();
  const nameRef = useRef();
  const [name, setName] = useState(`${currentUser.displayName}`);

  const submitHandler = (e) => {
    e.preventDefault();
    currentUser
      .updateProfile({
        displayName: `${nameRef.current.value}`
      })
      .then(function () {
        console.log("Update successful.");
        setName(`${nameRef.current.value}`);
      })
      .catch(function (error) {
        console.log("Hibae");
        // An error happened.
      });
  };

  return (
    <>
      <div className="profile-main">
      <div className="invisible">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ea
        expedita odio, corrupti sint consequuntur, neque nihil deleniti minus
        quibusdam iure qui suscipit voluptates. Debitis quis minima fugiat
        libero numquam?
      </div>
      <img className="user-avatar" src={currentUser.photoURL} alt="user avatar"/>
        <strong>Email: </strong> {currentUser.email}
        <strong style={{ marginTop: 10 }}>Nickname: </strong>
        {currentUser.displayName !== null && name}
        <form onSubmit={submitHandler}>
          <input type="text" ref={nameRef} placeholder="Enter your name here" style={{width: '100%'}}/>
          <button type="submit" style={{width: '100%'}}>Save Profile</button>
        </form>
          <Link to="/">
            <button className="profile-button">Back to the frontpage</button>
          </Link>
      </div>
    </>
  );
};

export default Profile;
