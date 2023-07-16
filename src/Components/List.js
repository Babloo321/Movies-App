import React, { Component } from "react";
import { movies } from "./getMovies";
export default class List extends Component {
  constructor() {
    super();
    this.state={
      hover: ""
    }
  }
  handleEnter = (id) => {
    this.setState({
      hover : id
    });
  }
  handleLeave = () => {
    this.setState({
      hover : ""
    });
  }
  render() {
    // console.log(movies)
    let movie = movies.results;
    console.log(movie);
    return (
      <>
        {movie.lenght == 0 ? (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {movie.map((movieObj) => (
                <div className="card movie-card" onMouseEnter={()=>this.handleEnter(movieObj.id)} onMouseLeave={this.handleLeave}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                    style={{ height: "40vh"}}
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                  {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                  <div className="button-wrapper">
                    {
                      // if the this.state.hover is equal to movieObj.id than show button
                      this.state.hover == movieObj.id &&(
                      <a href="#" className="btn btn-primary movie-button">Add to Favourites</a>
                   )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="pagination-page">
        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
</div>
      </>
    );
  }
}
