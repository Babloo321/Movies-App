import React, { Component } from "react";
import axios from "axios";
import { movies } from "./getMovies";
import { json } from "react-router-dom";
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre:[],
      currGenre : "All Genre",
    };
  }
  async componentDidMount() {
    // console.log("componentDidMount is called");
    // let res = await axios.get(
      //   `https://api.themoviedb.org/3/movie/popular?api_key=3ade97d8d854fa3eda373ad1646650e3&language=eng-US&page=1`
      // );
      let result = JSON.parse(localStorage.getItem("movies"));
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
    let genreArr = [];
    result.map((movieObj) => {
      if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
        genreArr.push(genreId[movieObj.genre_ids[0]]);
      }
  });
    genreArr.unshift("All genre");
    console.log(genreArr)
    // console.log(res.data);
    this.setState({
      movies: [...result], // [{},{},{}...]movies arrayObject
      genre:[...genreArr],
    });
  }

  handleCurrGen = (genreId) => {
    this.setState({
      currGenre : genreId,
    })
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
      let filteredMovie = [];
      if(this.state.currGenre != "All Genre"){
        filteredMovie = this.state.movies.filter((movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre);
      }else filteredMovie = this.state.movies;
    return (
      <div className="row">
        <div className="col-3 favourites-list">
          <ul class="list-group">
          {this.state.genre.map((genre) => 
            this.state.currGenre == genre ? (
                <li class="list-group-item active" aria-current="true">
              {genre}</li> ):
            <li class="list-group-item " aria-current="true" onClick={() => this.handleCurrGen(genre)}>
            {genre}
          </li>
        )}
            </ul>
        </div>
        <div className="col favourites-table">
          <div className="row">
            <input type="text" placeholder="Search" className="col-8"></input>
            <input type="text" placeholder="5" className="col-4"></input>
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
                {filteredMovie.map((moviesObj) => (
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
                    <td><button type="button" class="btn btn-outline-danger">Delete</button></td>
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
