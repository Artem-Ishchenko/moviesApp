import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import './app.css';

import AlertDisconnectedMessage from '../disconnected';
import CardList from '../card-list/card-list';

export default class App extends Component {
  changeTextSize = (text, limitWords = 205) => {
    if (text.length < limitWords) return text;
    text = text.slice(0, limitWords);
    let lastSpace = text.lastIndexOf(' ');
    text = text.substring(0, lastSpace);
    text += ' ...';
    return text;
  };

  render() {
    return (
      <>
        <Online>
          <div className="app-main">
            <CardList changeTextSize={this.changeTextSize} />
          </div>
        </Online>
        <Offline>
          <AlertDisconnectedMessage />
        </Offline>
      </>
    );
  }
}
