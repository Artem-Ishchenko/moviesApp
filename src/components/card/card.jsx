import { Component } from 'react';
import { parseISO, format } from 'date-fns';

import MySpin from '../spin';
import Image from '../image';
import Description from '../description';
import './card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_path: this.props.settings.poster_path,
      name: this.props.settings.title,
      date: this.props.settings.release_date,
      text: this.props.settings.overview,
      loading: false,
    };
  }

  funcDate = (yourDate) => {
    if (yourDate) {
      return format(parseISO(yourDate), 'MMMM d, y');
    }
  };

  fullUrl(url, size, path) {
    if (path !== null) {
      return `${url}${size}${path}`;
    }
  }

  componentDidMount() {
    const basicUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500/';
    const path = this.state.image_path;
    this.setState({
      image: this.fullUrl(basicUrl, size, path),
      loading: true,
    });
  }

  render() {
    const { changeTextSize } = this.props;

    const imageSpin = !this.state.loading ? <MySpin /> : null;
    const myImage = this.state.loading ? <Image url={this.state.image} alt={this.state.name} /> : <MySpin />;

    const contetn = (
      <Description
        name={this.state.name}
        date={this.funcDate(this.state.date)}
        text={changeTextSize(this.state.text)}
      />
    );

    return (
      <div className="card-main">
        <div className="card-main__image">
          {imageSpin}
          {myImage}
        </div>
        {contetn}
      </div>
    );
  }
}
