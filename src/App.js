import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from 'navigation';
import TestComponent from 'test-component';

import 'styles/app.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <Switch>
          <Route path="/about/people" component={ TestComponent } />
          <Route path="/about/history" component={ TestComponent } />
          <Route path="/about/what" component={ TestComponent } />
          <Route path="/about" component={ TestComponent } />
          <Route path="/contact/places/chicago" component={ TestComponent } />
          <Route path="/contact/places/new-york" component={ TestComponent } />
          <Route path="/contact/places" component={ TestComponent } />
          <Route path="/contact/offices" component={ TestComponent } />
          <Route path="/contact/person" component={ TestComponent } />
          <Route path="/contact" component={ TestComponent } />
          <Route path="/" component={ TestComponent } />
        </Switch>
      </div>
    );
  }
}

export default App;
