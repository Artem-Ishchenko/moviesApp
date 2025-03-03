export default class TmdbService {
  state = {
    date: null,
  };

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTgyOTA0MTYxZGY1NGEzNzc0YjU5MTRiZTM3YTlmOCIsIm5iZiI6MTczNzExMjg4Ni44MTcsInN1YiI6IjY3OGEzZDM2OTNmNzQyY2MyOWFkMGVkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ik6BNtg9uDEXX4WgmzMHb0ppPUtl57NLx4gQCd6uA4o',
    },
  };

  async getAuthenticResource() {
    const result = await fetch('https://api.themoviedb.org/3/authentication', this.options);
    const data = result.json();
    return data;
  }

  async getError() {
    const result = await fetch('https://api.themoviedb.org/3', this.options);
    const data = result.json();
    return data;
  }

  async getQuery(text, page) {
    const result = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=false&language=en-US&page=${page}`,
      this.options
    );
    const data = await result.json();
    return data;
  }

  async getConfigsImages() {
    const result = await fetch(`https://api.themoviedb.org/3/configuration`, this.options);
    const data = await result.json();
    return data;
  }

  async getPopularMovies(page) {
    const result = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, this.options);
    const data = await result.json();
    return data;
  }

  async getGanre() {
    const result = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ru-RU', this.options);
    const data = await result.json();
    return data;
  }
}
