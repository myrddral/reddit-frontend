import Posts from "./Posts.js";
import About from "./About.js";
import NewPost from "./NewPost.js";

const Main = () => {
  return (
    <>
      <div className="main">
        <div className="content-area">
            <NewPost />
          <Posts />
        </div>
          <div className="info-area">
            <About />
          </div>
      </div>
    </>
  );
};

export default Main;
