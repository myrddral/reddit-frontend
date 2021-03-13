import Posts from "./Posts.js";
import About from "./About.js";
import NewPost from "./NewPost.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SubmitPost from "./SubmitPost.js";

const Main = () => {
  return (
    <>
      <div className="main">
        <div className="content-area">
          <Router>
            <Switch>
              <Route exact path="/">
                <NewPost />
                <Posts />
              </Route>
              <Route path="/submit">
                <SubmitPost />
              </Route>
            </Switch>
          </Router>
        </div>
        <div className="info-area">
          <About />
        </div>
      </div>
    </>
  );
};

export default Main;
