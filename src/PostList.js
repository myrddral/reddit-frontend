import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes.js";
import db from "./db.js";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const timePassed = (postTimestamp) => {
    const actualTimestamp = new Date().getTime() / 1000;
    return Math.round((actualTimestamp - postTimestamp) / 3600);
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
            <Link className="post-link-container" to={`/postdetails/${post.id}`}>
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
                  <small>123 Comments</small>
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
        ))}
    </>
  );
};

export default Posts;
