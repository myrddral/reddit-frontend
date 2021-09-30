import "../css/profile.css";
import { useAuth } from "../backend/auth.js";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatarImage from "../assets/avatar.png";
import db from "../backend/db.js";

const Profile = () => {
  const { currentUser } = useAuth();
  const nameRef = useRef();
  const [name, setName] = useState(`${currentUser.displayName}`);

  const copyDisplayNameToDatabase = (name) => {
    db.collection("users")
      .where("email", "==", `${currentUser.email}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("users").doc(doc.id)
          .update({ displayName: name})
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    currentUser
      .updateProfile({
        displayName: `${nameRef.current.value}`,
      })
      .then(function () {
        console.log("Update successful.");
        setName(`${nameRef.current.value}`);
        copyDisplayNameToDatabase(nameRef.current.value);
      })
      .catch(function (error) {
        console.log(error);
        // An error happened.
      });
  };

  const userAvatar = (
    <img className="user-avatar" src={currentUser.photoURL} alt="user avatar" />
  );
  const defaultAvatar = (
    <img className="user-avatar" src={defaultAvatarImage} alt="user avatar" />
  );

  return (
    <>
      <div className="profile-main">
        {currentUser.photoURL ? userAvatar : defaultAvatar}
        <strong>Email: </strong> {currentUser.email}
        <strong style={{ marginTop: 10 }}>Nickname: </strong>
        {currentUser.displayName !== null && name}
        <form onSubmit={submitHandler}>
          <input
            type="text"
            ref={nameRef}
            placeholder="Enter your name here"
            style={{ width: "100%" }}
          />
          <button type="submit" style={{ width: "100%" }}>
            Save Profile
          </button>
        </form>
        <Link to="/">
          <button className="profile-button">Back to the frontpage</button>
        </Link>
      </div>
    </>
  );
};

export default Profile;
