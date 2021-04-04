import Avatar from "../assets/avatar.png";
import "../css/newPost.css";
// import InsertPicture from './assets/insert-image.png'
// import InsertLink from './assets/insert-link.png'
import { Link } from "react-router-dom";
import { useAuth } from "../backend/auth.js";
import { useState, useEffect } from "react";

const NewPost = () => {
  const { currentUser } = useAuth();
  const [userAvatar, setUserAvatar] = useState(Avatar);

  useEffect(() => {
      if (currentUser.photoURL) {
        setUserAvatar(currentUser.photoURL)
      }
  },[currentUser.photoURL]);

  return (
    <>
      <div className="new-post">
        <img className="new-post-avatar" alt="avatar" src={userAvatar} />
        <Link to="/submit" style={{ width: "100%" }}>
          <input className="new-post-input" type="text" placeholder="Create Post"></input>
        </Link>
        {/* <img alt="insert pic" src={InsertPicture} style={{ height: 22, marginTop: 15}}></img>
            <img alt="insert link" src={InsertLink} style={{ height: 22, marginTop: 15}}></img> */}
      </div>
    </>
  );
};

export default NewPost;
