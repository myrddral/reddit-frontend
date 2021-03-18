import { useState } from "react";
import { useRouteMatch } from "react-router";
import { useAuth } from "./auth.js";
import { v4 as uuidv4 } from "uuid";
import "./css/commentSection.css";
import db from "./db";

const CommentSection = ({ comments }) => {
  const { currentUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [comment, setComment] = useState('');
  const timestamp = Math.floor(Date.now() / 1000);
  const commenter = currentUser.displayName;
  let match = useRouteMatch();

  const timePassed = (postTimestamp) => {
    const actualTimestamp = new Date().getTime() / 1000;
    return Math.round((actualTimestamp - postTimestamp) / 3600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const uuid = uuidv4().replace(/-/g, "");

    const commentKey = `comments.${uuid}.comment`;
    const commenterKey = `comments.${uuid}.commenter`;
    const timestampKey = `comments.${uuid}.timestamp`;
    const likedbyKey = `comments.${uuid}.likedby`;

    const formData = {
      [commentKey]: comment,
      [commenterKey]: commenter,
      [timestampKey]: timestamp,
      [likedbyKey]: []
    }

    setIsPending(true);
    db.collection("posts")
      .doc(`${match.params.post_id}`)
      .update(formData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    setIsPending(false);
  };
  
  console.log(this);
  return (
    <>
      <div className="comment-section">
        <form onSubmit={handleSubmit} className="submit-comment">
          <div className="userinfo">
            <label htmlFor="new-comment">
              Comment as{" "}
              <small>
                <strong>{currentUser.displayName}</strong>
              </small>
            </label>
          </div>
          <textarea
            name="new-comment"
            className="new-comment-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {!isPending && (
            <button type="submit" id="submit-comment-button">
              Comment
            </button>
          )}
        </form>
        <div className="comments-list">
          {comments &&
            // entry[0] === comment key | entry[1] === comment data
            Object.entries(comments).map((entry) => (
              <div key={entry[0]} className="comment-container">
                <small className="commenter">
                  <strong>{entry[1].commenter} </strong>
                  <span>{timePassed(entry[1].timestamp)} hours ago</span>
                </small>
                <div className="comment">{entry[1].comment}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CommentSection;
