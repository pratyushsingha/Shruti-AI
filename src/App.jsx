import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chatbot" component={Chatbot} />
          <Route exact path="/team" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
