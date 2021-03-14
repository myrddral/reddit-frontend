import { useState } from "react";
import { Link } from "react-router-dom";
import "./SubmitPost.css";
import db from './db';

const SubmitPost = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [owner, setOwner] = useState('anonymous');
  const [score, setScore] = useState(0);
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [vote, SetVote] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, url, owner, score, timestamp, vote }
    console.log(formData);

    db.collection('posts').doc().set(formData)
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    
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
        <Link to="/">
          <button id="cancel-button">CANCEL</button>
        </Link>
        <button type="submit" id="submit-button">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SubmitPost;
