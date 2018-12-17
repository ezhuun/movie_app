import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {}//end state
  componentDidMount(){
     this._getMovies();
  }//end of componentDidMount

_renderMovies = () => {
  const movies = this.state.movies.map(movie => {
    return(
      <Movie
        title={movie.title_english}
        poster={movie.large_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    )
  })
  return movies;
}// end of _renderMovies

_getMovies = async() => {
  const movies = await this._callApi();
  this.setState({
    movies
  })
}//end of _getMovies

_callApi = () => {
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
  .then(response => response.json())
  .then(json => json.data.movies)
  .catch(err => console.log(err))
}//end of _callApi
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }//end of render
}//end of class

export default App;
