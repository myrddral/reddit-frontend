import Votes from "./Votes.js";
import exitToIcon from "../assets/exit-to.png";
import { timePassed } from "../utils/utils.js";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  const history = useHistory();
  const handlePostClick = (id) => {
    history.push(`/postdetails/${id}`);
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
          onClick={() => handlePostClick(post.id)}
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
              <Link to={post.url}>
              <small>
                {post.url.substring(0, 16)}...{" "}
                <img
                  alt="open link directly"
                  src={exitToIcon}
                  style={{ maxWidth: 15 }}
                />
              </small>
              </Link>
            </div>
            <div className="post-actions">
              {post && (
                <small>{Object.keys(post.comments).length} Comments</small>
              )}
              <small>Award</small>
              <small>Share</small>
              <small>Save</small>
            </div>
          </div>
          <div className="post-image">
            <img
              className="post-image"
              alt="post-content"
              src={post.imgUrl}
              style={{ height: 110, width: 140 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
