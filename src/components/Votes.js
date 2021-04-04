import { useState, useEffect } from "react";
import upvoteArrowImage from "../assets/upvote.png";
import upvotedArrowImage from "../assets/upvoted.png";
import downvoteArrowImage from "../assets/downvote.png";
import downvotedArrowImage from "../assets/downvoted.png";
import { useAuth } from "../backend/auth.js";
import db from "../backend/db";
import firebase from "firebase/app";

const Votes = (props) => {
  const { currentUser } = useAuth();
  const [votecount, setVotecount] = useState(props.votecount);
  const [upVoteArrow, setUpVoteArrow] = useState("");
  const [downVoteArrow, setDownVoteArrow] = useState("");
  const [hasUserUpVoted, setHasUserUpVoted] = useState("");
  const [hasUserDownVoted, setHasUserDownVoted] = useState("");

  useEffect(() => {
    if (currentUser) {
      setHasUserUpVoted(props.upVotedBy.includes(`${currentUser.email}`));
      setHasUserDownVoted(props.downVotedBy.includes(`${currentUser.email}`));
    }

    if (hasUserUpVoted) {
      setUpVoteArrow(upvotedArrowImage);
    } else {
      setUpVoteArrow(upvoteArrowImage);
    }

    if (hasUserDownVoted) {
      setDownVoteArrow(downvotedArrowImage);
    } else {
      setDownVoteArrow(downvoteArrowImage);
    }
  }, [
    hasUserUpVoted,
    hasUserDownVoted,
    props.upVotedBy,
    props.downVotedBy,
    currentUser,
  ]);

  // console.log(currentUser);

  const handleUpVoteClick = () => {
    if (currentUser && !hasUserUpVoted) {
      setVotecount(votecount + 1);
      db.collection("posts")
        .doc(`${props.id}`)
        .update({
          score: firebase.firestore.FieldValue.increment(1),
          upVotedBy: firebase.firestore.FieldValue.arrayUnion(
            `${currentUser.email}`
          ),
          downVotedBy: firebase.firestore.FieldValue.arrayRemove(
            `${currentUser.email}`
          ),
        })
        .then(() => {
          console.log("Post upvoted!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      if (!currentUser) {
        alert("You must sign in to vote!");
      } else {
        return null;
      }
    }
  };

  const handleDownVoteClick = () => {
    if (currentUser && !hasUserDownVoted) {
      setVotecount(votecount - 1);
      db.collection("posts")
        .doc(`${props.id}`)
        .update({
          score: firebase.firestore.FieldValue.increment(-1),
          downVotedBy: firebase.firestore.FieldValue.arrayUnion(
            `${currentUser.email}`
          ),
          upVotedBy: firebase.firestore.FieldValue.arrayRemove(
            `${currentUser.email}`
          ),
        })
        .then(() => {
          console.log("Post downvoted!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      if (!currentUser) {
        alert("You must sign in to vote!");
      } else {
        return null;
      }
    }
  };

  const voteCountFormatter = () => {
    if (votecount >= 1000) {
      return `${Math.round((votecount / 1000) * 10) / 10}k`;
    } else {
      return votecount;
    }
  };

  // const drawUpvoteArrow = () => {
  //   if (props.upVotedBy.includes(`${currentUser.email}`)) {
  //     return upvotedArrowImage;
  //   } else {
  //     return upvoteArrowImage;
  //   }
  // };
  // const drawDownvoteArrow = () => {
  //   if (props.downVotedBy.includes(`${currentUser.email}`)) {
  //     return downvotedArrowImage;
  //   } else {
  //     return downvoteArrowImage;
  //   }
  // };

  return (
    <>
      <img
        style={{ cursor: "pointer" }}
        src={upVoteArrow}
        onClick={() => {
          handleUpVoteClick();
        }}
        alt="upvote-button"
      />
      <div className="counter">{voteCountFormatter()}</div>
      <img
        style={{ cursor: "pointer" }}
        src={downVoteArrow}
        onClick={() => {
          handleDownVoteClick();
        }}
        alt="downvote-button"
      />
    </>
  );
};

export default Votes;
