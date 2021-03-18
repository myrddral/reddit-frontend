import Title from "./Title.js";
import Header from "./Header.js";
import PostList from "./PostList.js";
import About from "./About.js";
import NewPost from "./NewPost.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SubmitPost from "./SubmitPost.js";
import PostDetails from "./PostDetails.js";
import PrivateRoute from "./PrivateRoute.js";
import { useAuth } from "./auth.js";

const Main = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <Title />
      <div className="main">
        <div className="content-area">
          <Router>
            <Switch>
              <Route exact path="/">
                {currentUser && <NewPost />}
                <PostList />
              </Route>
              <PrivateRoute path="/submit">
                <SubmitPost />
              </PrivateRoute>
              <PrivateRoute path="/postdetails/:post_id">
                <PostDetails />
              </PrivateRoute>
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
