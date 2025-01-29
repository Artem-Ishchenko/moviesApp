import { Component } from 'react';
import './description.css';

export default class Description extends Component {
  render() {
    const { name, date, text } = this.props;
    return (
      <div className="card-main__description">
        <h5 className="card-main__name">{name}</h5>
        <h2 className="card-main__release">{date}</h2>
        <div className="card-main__genres">
          <div className="card-main__genres-item">Action</div>
          <div className="card-main__genres-item">Drama</div>
        </div>
        <div className="card-main__text">{text}</div>
      </div>
    );
  }
}
