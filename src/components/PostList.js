import { useEffect, useState } from "react";
import db from "../backend/db.js";
import Post from "./Post.js";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(true);

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
      {posts && posts.map((posts) => <Post key={posts.id} post={posts} />)}
    </>
  );
};

export default Posts;
