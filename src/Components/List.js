import React, { Component } from "react";
import { movies } from "./getMovies";
export default class List extends Component {
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
                <div className="card movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt="..."
                    style={{ height: "40vh", width: "20vw" }}
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                  {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                  <div className="button-wrapper">
                    <a href="#" className="btn btn-primary movie-button">Add to Favourites</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
