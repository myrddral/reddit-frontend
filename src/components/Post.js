import Votes from "./Votes.js";
import exitToIcon from "../assets/exit-to.png";
import { timePassed } from "../utils/utils.js";
import { useHistory, useLocation } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import db from "../backend/db.js";

const Post = ({ post, postID, isInDetailsView }) => {
  const history = useHistory();
  const location = useLocation();

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
        history.push('/')
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

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
                Posted by {post.owner}{" "}
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
                  {post.url.substring(0, 16)}...{" "}
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
              {isInDetailsView && (
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
