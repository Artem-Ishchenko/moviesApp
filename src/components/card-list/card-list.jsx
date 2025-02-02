import { Component } from 'react';

import './card-list.css';
import Card from '../card';
import MySpin from '../spin';
import AlertMessage from '../error';
import AlertEmpty from '../empty';
import TmdbService from '../../services/tmdb-service';
import Search from '../search';
import MyPagination from '../pagination';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: null,
      query: '',
      totalPages: 1,
      currentPage: 1,
    };
    this.tmdbApi = new TmdbService();
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchMovies();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    this.setState({ isLoaded: false, error: null });

    const fetchData =
      this.state.query.trim() === ''
        ? this.tmdbApi.getPopularMovies(this.state.currentPage)
        : this.tmdbApi.getQuery(this.state.query, this.state.currentPage);

    fetchData.then(
      (res) => {
        if (res && res.results) {
          let total = res.total_pages;
          total >= 500 && (total = 500);
          this.setState({ isLoaded: true, movies: res.results, totalPages: total });
        } else {
          this.setState({ isLoaded: true, movies: [] });
        }
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: <AlertMessage messageError={error} />,
        });
      }
    );
  };

  onChangeQuery = (query) => {
    this.setState({ query, currentPage: 1 });
  };

  handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= this.state.totalPages) {
      this.setState({ currentPage: newPage });
    }
  };

  render() {
    const { error, isLoaded, movies, currentPage, totalPages } = this.state;

    if (error) return error;

    return (
      <>
        <Search query={this.state.query} onChangeQuery={this.onChangeQuery} />
        <div className="card-list">
          {!isLoaded ? (
            <MySpin />
          ) : movies && movies.length > 0 ? (
            movies.map((item) => <Card key={item.id} settings={item} changeTextSize={this.props.changeTextSize} />)
          ) : (
            <AlertEmpty />
          )}
          {isLoaded && movies.length > 0 && (
            <MyPagination current={currentPage} total={totalPages} onChange={this.handlePageChange} />
          )}
        </div>
      </>
    );
  }
}
