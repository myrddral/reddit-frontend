import "./App.css";
import Signup from "./Signup.js";
import Login from "./Login.js";
import Main from "./Main.js";
import Navigation from "./Navigation.js";
import Profile from "./Profile.js";
import PrivateRoute from "./PrivateRoute.js"
import { AuthProvider } from "./auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navigation />
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
