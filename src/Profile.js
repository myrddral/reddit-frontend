import "./profile.css";
import { useAuth } from "./auth.js";
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
        displayName: `${nameRef.current.value}`,
        photoURL:
          "https://banner2.cleanpng.com/20180715/pao/kisspng-computer-icons-icon-design-user-web-user-icon-5b4ad7c5b9eaf6.9562954315316315577615.jpg",
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
