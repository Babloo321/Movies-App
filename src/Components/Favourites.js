import React, { Component } from "react";
import axios from "axios";
import { movies } from "./getMovies";
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }
  async componentDidMount() {
    // console.log("componentDidMount is called");
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=3ade97d8d854fa3eda373ad1646650e3&language=eng-US&page=1`
    );
    console.log(res.data);
    this.setState({
      movies: [...res.data.results], // [{},{},{}...]movies arrayObject
    });
  }
  render() {
    let genreId = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
    console.log(movies);
    return (
      <div className="row">
        <div className="col-3">
          <ul class="list-group">
            <li class="list-group-item active" aria-current="true">
              All Genres
            </li>
            <li class="list-group-item">Fantasy</li>
            <li class="list-group-item">Action</li>
            <li class="list-group-item">Horror</li>
          </ul>
        </div>
        <div className="col">
          <div className="row">
            <input type="text" placeholder="Search" className="col"></input>
            <input type="text" placeholder="5" className="col"></input>
          </div>
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Popularity</th>
                  <th scope="col">Rating</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map((moviesObj) => (
                  <tr>
                    <td scope="row">
                      <img
                        src={`https://image.tmdb.org/t/p/original${moviesObj.backdrop_path}`}
                        style={{ width: "8rem" }}
                      />
                      {moviesObj.original_title}
                    </td>
                    <td>{genreId[moviesObj.genre_ids[0]]}</td>
                    <td>{moviesObj.popularity}</td>
                    <td>{moviesObj.vote_average}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
