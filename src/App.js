import "./App.css";
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
            <Route exact path="/" component={Main} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
