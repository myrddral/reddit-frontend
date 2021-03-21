import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes.js";
import db from "./db.js";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const timePassed = (postTimestamp) => {
    const actualTimestamp = new Date().getTime() / 1000;
    const minutesPassed = Math.round((actualTimestamp - postTimestamp) / 60);
    const hoursPassed = Math.round(minutesPassed / 60);
    const daysPassed = Math.round(hoursPassed / 24);
    if (minutesPassed < 1) {
      return `seconds ago`;
    } else if (hoursPassed < 1) {
      return `${minutesPassed} minutes ago`;
    } else if (hoursPassed <= 23) {
      return `${hoursPassed} hours ago`;
    } else if (hoursPassed > 23) {
      return `${daysPassed} days ago`;
    } 
  };

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((data) => {
        const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(result);
        setIsPending(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {isPending && (
        <center>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </center>
      )}
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="post-container">
            <div className="vote-container">
              <Votes
                votecount={post.score}
                owner={post.owner}
                vote={post.vote}
              />
            </div>
            <Link
              className="post-link-container"
              to={`/postdetails/${post.id}`}
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
                  <h4>{post.title}</h4>
                </div>
                <div className="post-actions">
                  <small>{Object.keys(post.comments).length} Comments</small>
                  <small style={{ color: "lightgray" }}>Award</small>
                  <small style={{ color: "lightgray" }}>Share</small>
                  <small style={{ color: "lightgray" }}>Save</small>
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
        ))}
    </>
  );
};

export default Posts;
