import { Component } from 'react';
import { debounce } from 'lodash';

import './card-list.css';
import Card from '../card';
import MySpin from '../spin';
import AlertMessage from '../error';
import AlertEmpty from '../empty';
import TmdbService from '../../services/tmdb-service';
import Search from '../search';
import MyPagination from '../pagination';
import { Provider } from '../context';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isGenresLoaded: false,
      movies: [],
      query: '',
      totalPages: 1,
      currentPage: 1,
      genre: null,
    };
    this.tmdbApi = new TmdbService();
  }

  componentDidMount() {
    if (this.state.genre === null) {
      this.fetchGenre();
    }
    if (this.state.movies.length === 0) {
      this.fetchMovies();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.currentPage !== this.state.currentPage) {
      this.fetchMovies();
      if (prevState.currentPage !== this.state.currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  fetchMovies = debounce(() => {
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
        this.setState({ isLoaded: true, error: <AlertMessage messageError={error} /> });
      }
    );
  }, 300);

  fetchGenre = () => {
    if (this.state.genre !== null) return;
    this.setState({ isLoaded: false, error: null });

    const fetchData = this.tmdbApi.getGanre();
    fetchData.then(
      (res) => {
        if (res && res) {
          this.setState({ isGenresLoaded: true, genre: res.genres });
        } else {
          this.setState({ isGenresLoaded: true, genre: [] });
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
    const { error, isLoaded, movies, currentPage, totalPages, isGenresLoaded } = this.state;
    if (error) return error;
    return (
      <>
        <Search query={this.state.query} onChangeQuery={this.onChangeQuery} />

        <div className="card-list">
          {!isLoaded || !isGenresLoaded ? (
            <MySpin />
          ) : movies && movies.length > 0 ? (
            <Provider value={this.state.genre}>
              {movies.map((item) => (
                <Card key={item.id} settings={item} />
              ))}
            </Provider>
          ) : (
            <AlertEmpty />
          )}
          {isLoaded && isGenresLoaded && Array.isArray(movies) && movies.length > 0 && (
            <div className="mypagination-inCard">
              <MyPagination current={currentPage} total={totalPages} onChange={this.handlePageChange} />
            </div>
          )}
        </div>
      </>
    );
  }
}
