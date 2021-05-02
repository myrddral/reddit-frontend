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
  const [upVoteArrow, setUpVoteArrow] = useState(upvoteArrowImage);
  const [downVoteArrow, setDownVoteArrow] = useState(downvoteArrowImage);
  const [hasUserUpVoted, setHasUserUpVoted] = useState(false);
  const [hasUserDownVoted, setHasUserDownVoted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setHasUserUpVoted(props.upVotedBy.includes(`${currentUser.email}`));
      setHasUserDownVoted(props.downVotedBy.includes(`${currentUser.email}`));
    }
  }, [currentUser, props.upVotedBy, props.downVotedBy]);

  useEffect(() => {
    if (hasUserUpVoted) {
      setUpVoteArrow(upvotedArrowImage);
      setDownVoteArrow(downvoteArrowImage);
    }

    if (hasUserDownVoted) {
      setDownVoteArrow(downvotedArrowImage);
      setUpVoteArrow(upvoteArrowImage);
    }
  }, [hasUserUpVoted, hasUserDownVoted]);

  const handleVoteClick = (voteDirection) => {
    if (!currentUser) {
      alert("You must sign in to vote!");
      return;
    } else if (currentUser && voteDirection === 1 && hasUserUpVoted) {
      return null;
    } else if (currentUser && voteDirection === -1 && hasUserDownVoted) {
      return null;
    }

    let updateObject = {};

    if (voteDirection === 1) {
      updateObject = {
        score: firebase.firestore.FieldValue.increment(1),
        upVotedBy: firebase.firestore.FieldValue.arrayUnion(
          `${currentUser.email}`
        ),
        downVotedBy: firebase.firestore.FieldValue.arrayRemove(
          `${currentUser.email}`
        ),
      };
    } else if (voteDirection === -1) {
      updateObject = {
        score: firebase.firestore.FieldValue.increment(-1),
        downVotedBy: firebase.firestore.FieldValue.arrayUnion(
          `${currentUser.email}`
        ),
        upVotedBy: firebase.firestore.FieldValue.arrayRemove(
          `${currentUser.email}`
        ),
      };
    }
    setVotecount(votecount + voteDirection);
    db.collection("posts")
      .doc(`${props.id}`)
      .update(updateObject)
      .then(() => {
        if (voteDirection === 1) {
          setHasUserUpVoted(true);
          setHasUserDownVoted(false);
          console.log("Post upvoted!");
        } else if (voteDirection === -1) {
          setHasUserDownVoted(true);
          setHasUserUpVoted(false);
          console.log("Post downvoted!");
        }
      })
      .catch((error) => {
        console.error("Failed to vote: ", error);
      });
  };

  const voteCountFormatter = () => {
    if (votecount >= 1000) {
      return `${Math.round((votecount / 1000) * 10) / 10}k`;
    } else {
      return votecount;
    }
  };

  return (
    <>
      <img
        style={{ cursor: "pointer" }}
        src={upVoteArrow}
        onClick={() => {
          handleVoteClick(1);
        }}
        alt="upvote-button"
      />
      <div className="counter">{voteCountFormatter()}</div>
      <img
        style={{ cursor: "pointer" }}
        src={downVoteArrow}
        onClick={() => {
          handleVoteClick(-1);
        }}
        alt="downvote-button"
      />
    </>
  );
};

export default Votes;
