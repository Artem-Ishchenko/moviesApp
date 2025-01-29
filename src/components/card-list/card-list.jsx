import { Component } from 'react';

import './card-list.css';
import Card from '../card';
import MySpin from '../spin';
import AlertMessage from '../error';
import TmdbService from '../../services/tmdb-service';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: null,
    };
  }

  componentDidMount() {
    const tmdbApi = new TmdbService();
    tmdbApi.getQuery('return').then(
      (res) => {
        this.setState({
          isLoaded: true,
          movies: res.results,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: <AlertMessage messageError={error} />,
        });
      }
    );
  }

  render() {
    const { changeTextSize } = this.props;
    const { error, isLoaded, movies } = this.state;
    let elements;
    if (error) {
      return error;
    } else if (!isLoaded) {
      return <MySpin />;
    } else {
      elements = movies.map((item) => {
        return <Card key={item.id} settings={item} changeTextSize={changeTextSize} />;
      });
    }
    return <div className="card-list">{elements}</div>;
  }
}
