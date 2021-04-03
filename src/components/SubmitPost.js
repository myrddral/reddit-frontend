import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import "../css/SubmitPost.css";
import db from "../backend/db";
import { useAuth } from "../backend/auth.js";

const SubmitPost = () => {
  const [isPending, setIsPending] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [owner, setOwner] = useState("anonymous")
  const [score] = useState(0)
  const timestamp = Math.floor(Date.now() / 1000)
  const [vote] = useState(0)
  const [comments] = useState([])
  const history = useHistory()
  const { currentUser } = useAuth()

  useEffect(() => {
    setOwner(`${currentUser.displayName}`)
  }, [currentUser.displayName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(owner)
    const formData = { title, url, owner, score, timestamp, vote, comments }
    setIsPending(true)
    setTimeout(() => {     
        db.collection("posts")
          .doc()
          .set(formData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error)
          });
        setIsPending(false)
        history.push('/')
    }, 1000)
  };

  return (
    <div className="post-editor">
      <h4 style={{ margin: 0, paddingTop: 10, paddingBottom: 10, width: 550 }}>
        Create a post
      </h4>
      <form onSubmit={handleSubmit}>
        <textarea
          name="title"
          id="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        ></textarea>
        <input
          name="url"
          id="url"
          placeholder="Add Image URL"
          autoComplete="off"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <div className="button-container">
        <Link to="/">
          <button id="cancel-button">CANCEL</button>
        </Link>
        {!isPending && (
          <button type="submit" id="submit-button">
            SUBMIT
          </button>
        )}
        {isPending && (
          <button type="submit" id="submit-button-pending" disabled>
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        )}
        </div>
      </form>
    </div>
  );
};

export default SubmitPost;
