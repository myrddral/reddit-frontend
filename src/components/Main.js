import Title from "./Title.js";
import Header from "./Header.js";
import PostList from "./PostList.js";
import About from "./About.js";
import NewPost from "./NewPost.js";
import Profile from "./Profile.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SubmitPost from "./SubmitPost.js";
import PostDetails from "./PostDetails.js";
// import PrivateRoute from "./PrivateRoute.js";
// import Profile from "./Profile.js";
import { useAuth } from "../backend/auth.js";
import Navigation from "./Navigation.js";
import useWindowSize from "../utils/useWindowSize";

const Main = () => {
  const { currentUser } = useAuth();
  const { width } = useWindowSize();

  return (
    <>
      <Router>
        <Navigation />
        <Header />
        {width > 650 && <Title />}
        <div className="main">
          <div className="content-area">
            <Switch>
              <Route exact path="/">
                {currentUser && <NewPost />}
                <PostList />
              </Route>
              <Route path="/profile">
                {currentUser && <Profile /> }
              </Route>
              <Route path="/submit">
                <SubmitPost />
              </Route>
              <Route path="/postdetails/:post_id">
                <PostDetails />
              </Route>
            </Switch>
          </div>
          <div className="info-area">
            <About />
          </div>
        </div>
      </Router>
    </>
  );
};

export default Main;
