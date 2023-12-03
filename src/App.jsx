import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import "./App.css";

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
                logout={logout}
                user={user}
              />
            )}
          />
          <Route
            exact
            path="/chatbot"
            render={(props) => (
              <Chatbot
                {...props}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
                logout={logout}
                user={user}
              />
            )}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
