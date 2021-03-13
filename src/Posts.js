import { useEffect, useState } from "react";
import Votes from "./Votes.js";
import db from "./db.js";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const timePassed = (postTimestamp) => {
    const actualDate = new Date().getTime()/1000;
    return Math.round((actualDate - postTimestamp)/3600/24);
  }
  
  useEffect(() => {
    db.collection('posts')
    .get()
    .then((data) => {
      const result = data.docs.map((doc) => doc.data())
      setPosts(result);
      setIsLoading(false);
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  
  return (
    <>
      {isLoading && <center><div className="lds-ring"><div></div><div></div><div></div><div></div></div></center>}
      {posts && posts.map((post) => (
        <div key={post.id} className="post-container">
          <div className="vote-container">
            <Votes votecount={post.score} owner={post.owner} vote={post.vote}/>
          </div>
          <div className="post-text-container">
          <div className="post-text">
            <small className="posted-by">Posted by {post.owner} {timePassed(post.timestamp)} hours ago</small>
            <h3>
              {post.title}
            </h3>
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
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
