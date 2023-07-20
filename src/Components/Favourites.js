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
      currText : "",
      limit: 5,
      currPage: 1,
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
    });
  };

  handleText = (e) => {
   this.setState({
    currText : e.target.value
   });
  };

  sortPopularityAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objA.popularity - objB.popularity;
    });
    this.setState({
      movies: [...allMovies]
    });
  };

  sortPopularityDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objB.popularity - objA.popularity;
    });
    this.setState({
      movies: [...allMovies],
    });
  };

  sortRatingAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objA.vote_average - objB.vote_average;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  sortRatingDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average;
    });
    this.setState({
      movies: [...allMovies],
    });
  };

  handlePageNum = (page) => {
    this.setState({
      currPage: page,
    });
  };
  handleDelete = (id) => {
    let newMovies = this.state.movies.filter((movieObj) => {
      return movieObj.id != id;
    });
    this.setState({
      movies: [...newMovies]
    })
    localStorage.setItem("moveis", JSON.stringify(newMovies));

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
      let filteredMovie = this.state.movies;

      if(this.state.currText == ''){
        filteredMovie = this.state.movies;
      } else{
       filteredMovie = filteredMovie.filter((movieObj) => {
          let movieName = movieObj.original_title.toLowerCase()
          return movieName.includes(this.state.currText)
       });
      }

      if(this.state.currGenre != "All Genre"){
        filteredMovie = filteredMovie.filter(
          (movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre
          );
        }

        let numOfPages = Math.ceil(filteredMovie.length / this.state.limit);
        let pageArr = [];
        for(let i = 0; i <= numOfPages; i++){
          pageArr.push(i);
        }
        let si = (this.state.currGenre -1) * this.state.limit;
        let ei = si + this.state.limit - 1;
        filteredMovie = filteredMovie.slice(si, ei + 1);

    return (
      <div className="row">
        <div className="col-3 favourites-list">
          <ul class="list-group">
          {this.state.genre.map((genre) => 
            this.state.currGenre == genre ? (
                <li class="list-group-item active" aria-current="true">
              {genre}
              </li> 
              ):(
            <li 
            class="list-group-item " 
            aria-current="true" 
            onClick={() => this.handleCurrGen(genre)}
            >
            {genre}
          </li>
          )
        )}
            </ul>
        </div>
        <div className="col favourites-table">
          <div className="row">
            <input 
            type="text" 
            placeholder="Search" 
            className="col-8" 
            value={this.state.currText}
             onChange ={this.handleText}
             ></input>
            <input 
            type="number"  
            className="col-4"
            value = {this.state.limit}
            onChange={(e) => this.setState({ limit : e.target.value})}
            ></input>
          </div>
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">
                    <i 
                    class="fa-solid fa-sort-up" 
                    onClick={this.sortPopularityAsc}
                    />
                  Popularity
                  <i 
                  class="fa-solid fa-sort-down" 
                  onClick={this.sortPopularityDesc}
                  />
                  </th>
                  <th scope="col">
                    <i 
                    class="fa-solid fa-sort-up" 
                    onClick={this.sortRatingAsc}
                    />
                  Rating
                  <i 
                  class="fa-solid fa-sort-down" 
                  onClick={this.sortRatingDesc}
                  />
                  </th>
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
                    <td>{moviesObj.vote_average}
                    </td>
                    <td>
                      <button
                      class="btn btn-outline-danger"
                      onClick={() => this.handleDelete(moviesObj.id)}
                      >
                        Delete
                      </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav aria-label="Page navigation example">
  <ul class="pagination">
   {pageArr.map((page) =>(
      <li class="page-item">
      <a class="page-link" onClick={()=>this.handlePageNum(page)}>
        {page}
        </a>
      </li>
    ))}
  </ul>
</nav>
      </div>
    );
  }
}
