import Votes from "./Votes.js";
import { Link } from "react-router-dom";
import { timePassed } from '../utils/utils.js'

const Post = ({post}) => {

  return (
    <>
      <div className="post-container">
        <div className="vote-container">
          <Votes id={post.id} votecount={post.score} upVotedBy={post.upVotedBy} downVotedBy={post.downVotedBy}/>
        </div>
        <Link className="post-link-container" to={`/postdetails/${post.id}`}>
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
            <h4>{post.title}</h4>
          </div>
          <div className="post-actions">
            {post && <small>{Object.keys(post.comments).length} Comments</small>}
            <small>Award</small>
            <small>Share</small>
            <small>Save</small>
          </div>
        </div>
        <div className="post-image">
          <img
            className="post-image"
            alt="post-content"
            src={post.url}
            style={{ height: 110, width: 140 }}
          />
        </div>
        </Link>
      </div>
    </>
  );
};

export default Post;
