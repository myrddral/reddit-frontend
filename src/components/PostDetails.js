import "../css/postDetails.css";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import db from "../backend/db.js";
import CommentSection from "./CommentSection.js";
import SpinnerRing from "./SpinnerRing.js";
import Post from "./Post.js";

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

  const postSection = (
    <React.Fragment>
      <Post post={post} postID={match.params.post_id} isInDetailsView={true}/>
      <CommentSection comments={post.comments} />
    </React.Fragment>
  );

  return <>{isPending ? <SpinnerRing /> : postSection}</>;
};

export default PostDetails;
