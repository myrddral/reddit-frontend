import { useEffect, useState } from "react";
import Votes from "./Votes.js";
import db from "./db.js";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    db.collection('posts')
    .get()
    .then((data) => {
      const results = data.docs.map((doc) => doc.data())
      setPosts(results);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);
  
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <div className="vote-container">
            <Votes />
          </div>
          <div className="post-text">
            <small>{post.title}</small>
            <h3>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio similique sunt, cumque aspernatur, ducimus voluptatem
              porro optio quibusdam tenetur nobis facilis quae maiores nostrum,
              voluptatum quidem nihil? Totam, doloremque quam.
            </h3>
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
