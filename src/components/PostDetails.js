import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import db from "../backend/db.js";
import Post from "./Post.js";
import "../css/postDetails.css";
import CommentSection from "./CommentSection.js";

const PostDetails = () => {
  const [post, setPost] = useState("");
  const [isPending, setIsPending] = useState(true);
  let match = useRouteMatch();

  useEffect(() => {
    db.collection("posts")
      .doc(`${match.params.post_id}`)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setPost(doc.data());
        } else {
          console.log("No such document!");
        }
        setIsPending(false);
      });
    // .catch((error) => {
    //   console.log("Error getting document:", error);
    // });
  }, [match.params.post_id]);

  const loadingAnimation = (
    <center>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </center>
  );

  const postSection = (
    <React.Fragment>
      <Post post={post} />
      <CommentSection comments={post.comments} />
    </React.Fragment>
  );

  return <>{isPending ? loadingAnimation : postSection}</>;
};

export default PostDetails;
