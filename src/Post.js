import Votes from "./Votes.js";

const Post = ({post}) => {

  const timePassed = (postTimestamp) => {
    const actualTimestamp = new Date().getTime() / 1000;
    return Math.round((actualTimestamp - postTimestamp) / 3600);
  };

  return (
    <>
      <div className="post-container">
        <div className="vote-container">
          <Votes votecount={post.score} owner={post.owner} vote={post.vote} />
        </div>
        <div className="post-text-container">
          <div className="post-text">
            <small className="posted-by">
              Posted by {post.owner}{" "}
              <span className="timestamp">
                {timePassed(post.timestamp)} hours ago
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
      </div>
    </>
  );
};

export default Post;
