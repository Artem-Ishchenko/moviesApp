import { Component } from 'react';
import { parseISO, format } from 'date-fns';

import Description from '../description';
import Image from '../image/image';

import './card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedDate: '',
    };
  }

  componentDidMount() {
    const { release_date } = this.props.settings;
    if (release_date) {
      this.setState({ formattedDate: format(parseISO(release_date), 'MMMM d, y') });
    }
  }

  render() {
    const { poster_path, title, overview, vote_average, genre_ids } = this.props.settings;

    return (
      <div className="card-main">
        <Image urlPath={poster_path} />
        <Description
          name={title}
          date={this.state.formattedDate}
          text={overview}
          ratingNumber={vote_average}
          genreId={genre_ids}
          maxLength={120}
        />
      </div>
    );
  }
}
