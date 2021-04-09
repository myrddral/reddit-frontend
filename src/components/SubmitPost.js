import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../css/SubmitPost.css";
import db from "../backend/db";
import { useAuth } from "../backend/auth.js";
import suq from "suq";
import { isValidUrl } from "../utils/utils.js";

const SubmitPost = () => {
  const [isPending, setIsPending] = useState(false);
  const [urlToPost, setUrlToPost] = useState("");
  const [owner, setOwner] = useState("anonymous");
  const [score] = useState(0);
  const timestamp = Math.floor(Date.now() / 1000);
  const [upVotedBy] = useState([]);
  const [downVotedBy] = useState([]);
  const [comments] = useState([]);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    setOwner(`${currentUser.displayName}`);
  }, [currentUser.displayName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidUrl(`${urlToPost}`)) {
      setIsPending(true);
      suq(
        `https://infinite-savannah-13185.herokuapp.com/${urlToPost}`,
        function (err, json, body) {
          if (!err) {
            const postData = {
              title: json.opengraph["og:title"],
              url: json.opengraph["og:url"],
              imgUrl: json.opengraph["og:image"],
              owner,
              score,
              timestamp,
              upVotedBy,
              downVotedBy,
              comments,
            };
            db.collection("posts")
              .doc()
              .set(postData)
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
            setIsPending(false);
            history.push("/");
          }
        }
      );
    } else {
      alert("Not a valid URL!");
    }
  };

  return (
    <div className="post-editor">
      <h4 style={{ margin: 0, paddingTop: 10, paddingBottom: 10, width: 550 }}>
        Create a post (currently links with opengraph metadata only)
      </h4>
      <form onSubmit={handleSubmit}>
        {/* <textarea
          name="title"
          id="title"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        ></textarea> */}
        <input
          name="url"
          id="url"
          placeholder="Add the URL you want to post"
          autoComplete="off"
          required
          value={urlToPost}
          onChange={(e) => setUrlToPost(e.target.value)}
        ></input>
        <div className="button-container">
          <Link to="/">
            <button id="cancel-button">CANCEL</button>
          </Link>
          {!isPending && (
            <button type="submit" id="submit-button">
              SUBMIT
            </button>
          )}
          {isPending && (
            <button type="submit" id="submit-button-pending" disabled>
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubmitPost;
