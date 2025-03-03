import { Component } from 'react';

import './app.css';

import CardList from '../card-list/card-list';

export default class App extends Component {
  render() {
    return (
      <div className="app-main">
        <CardList />
      </div>
    );
  }
}
