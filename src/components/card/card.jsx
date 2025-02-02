import { Component } from 'react';
import { parseISO, format } from 'date-fns';

import Description from '../description';
import Image from '../image/image';
import './card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_path: this.props.settings.poster_path,
      name: this.props.settings.title,
      date: this.props.settings.release_date,
      text: this.props.settings.overview,
    };
  }

  funcDate = (yourDate) => {
    if (yourDate) {
      return format(parseISO(yourDate), 'MMMM d, y');
    }
  };

  render() {
    const { changeTextSize } = this.props;

    const image = <Image urlPath={this.state.image_path} />;

    const contetn = (
      <Description
        name={this.state.name}
        date={this.funcDate(this.state.date)}
        text={changeTextSize(this.state.text)}
      />
    );

    return (
      <div className="card-main">
        {image}
        {contetn}
      </div>
    );
  }
}
