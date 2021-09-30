import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { timePassed } from "../utils/utils.js";
import { useAuth } from "../backend/auth.js";
import db from "../backend/db.js";
import Votes from "./Votes.js";
import exitToIcon from "../assets/exit-to.png";

const Post = ({ post, postID, isInDetailsView }) => {
  const [ownerName, setOwnerName] = useState("anonymous");
  const [ownerEmail, setOwnerEmail] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    db.collection("users")
      .where("email", "==", `${post.owner}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setOwnerName(doc.data().displayName);
          setOwnerEmail(doc.data().email);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [post.owner]);

  const handlePostClick = (id, e) => {
    if (e.target.className === "post-url") {
      return null;
    } else {
      if (!location.pathname.includes("postdetails")) {
        history.push(`/postdetails/${id}`);
      } else {
        return null;
      }
    }
  };

  const handleDelete = () => {
    db.collection("posts")
      .doc(postID)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        history.push("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const isPostOwner = () => {
    if (currentUser && currentUser.email === ownerEmail) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div className="post-container">
        <div className="vote-container">
          <Votes
            id={post.id}
            votecount={post.score}
            upVotedBy={post.upVotedBy}
            downVotedBy={post.downVotedBy}
          />
        </div>
        <div
          className="post-link-container"
          onClick={(e) => handlePostClick(post.id, e)}
        >
          <div className="post-text-container">
            <div className="post-text">
              <small className="posted-by">
                Posted by {ownerName}{" "}
                <span className="timestamp">
                  {timePassed(post.timestamp)}
                  <span className="tooltiptext">
                    {new Date(post.timestamp).toLocaleString()}
                  </span>
                </span>
              </small>
              <h4 className="post-title">{post.title}</h4>
              <ExternalLink href={post.url} target="_blank">
                <small className="post-url">
                  {post.url.substring(0, 18)}...{" "}
                  <img
                    alt="open link directly"
                    src={exitToIcon}
                    style={{ maxWidth: 13 }}
                  />
                </small>
              </ExternalLink>
            </div>
            <div className="post-actions">
              {post && (
                <small>{Object.keys(post.comments).length} Comments</small>
              )}
              <small>Award</small>
              <small>Share</small>
              <small>Save</small>
              {(isInDetailsView && isPostOwner()) && (
                <small className="delete-button" onClick={handleDelete}>
                  Delete
                </small>
              )}
            </div>
          </div>
          <div className="post-image-container">
            <img className="post-image" alt="post-content" src={post.imgUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
