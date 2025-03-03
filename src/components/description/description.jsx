import { Component } from 'react';

import Stars from '../stars';
import './description.css';
import { Consumer } from '../context';

export default class Description extends Component {
  ratingColor(number) {
    if (number === null) return;
    if (number < 3) return '#E90000';
    if (number < 5) return '#E97E00';
    if (number < 7) return '#E9D100';
    if (number < 11) return '#66E900';
    return '#ffffff';
  }

  truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  render() {
    const { name, date, ratingNumber, genreId, text, maxLength } = this.props;
    const resText = this.truncateText(text, maxLength);
    const cardRating = (
      <div className="card-main__rating" style={{ borderColor: this.ratingColor(ratingNumber) }}>
        {parseFloat(ratingNumber.toFixed(1))}
      </div>
    );
    const genreAll = (
      <Consumer>
        {(value) => {
          if (!value) return;
          return genreId
            .map((item) => value.find((elem) => item === elem.id))
            .filter(Boolean)
            .map((item) => (
              <div key={item.id} className="card-main__genres-item">
                {item.name}
              </div>
            ));
        }}
      </Consumer>
    );
    return (
      <div className="card-main__description">
        <div className="card-main__mix">
          <h5 className="card-main__name">{name}</h5>
          {cardRating}
        </div>
        <h2 className="card-main__release">{date}</h2>
        <div className="card-main__genres">{genreAll}</div>
        <div className="card-main__text">{resText}</div>
        <div className="card-main__stars">
          <Stars />
        </div>
      </div>
    );
  }
}
