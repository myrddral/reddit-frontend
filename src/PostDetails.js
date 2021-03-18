import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import db from "./db.js";
import Post from "./Post.js";
import "./css/postDetails.css";
import CommentSection from "./CommentSection.js";

const PostDetails = () => {
  const [post, setPost] = useState("");
  const [isPending, setIsPending] = useState(true);
  let match = useRouteMatch();

  useEffect(() => {
    db.collection("posts")
      .doc(`${match.params.post_id}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setPost(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [match.params.post_id]);

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
      <Post post={post}/>
      <CommentSection comments={post.comments} />
    </>
  );
};

export default PostDetails;
