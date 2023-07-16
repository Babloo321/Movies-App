import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";
// API key: -> 3ade97d8d854fa3eda373ad1646650e3

export default class List extends Component {
  constructor() {
    super();
    console.log("constructor is called");
    this.state={
      hover: "",
      pageArr : [1],    // ab tak mai kon se page hu, what page am i showing
      currPage: 2,
      movies:[],
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
  async componentDidMount(){
    console.log("componentDidMount is called");
    let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3ade97d8d854fa3eda373ad1646650e3&language=eng-US&page=${this.state.currPage}`);
    console.log(res.data);
    this.setState({
      movies : [...res.data.results]   // [{},{},{}...]movies arrayObject
    })
  }
  render() {
    console.log("render is called");
    // console.log(movies)
    let movie = movies.results;
    console.log(movie);
    return (
      <>
        {this.state.movies.lenght == 0 ? (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
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
                    {// if the this.state.hover is equal to movieObj.id than show button
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
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    {
      this.state.pageArr.map(pageNum => (
        <li className="page-item">
          <a className="page-link" href="#">{pageNum}</a>
          </li>
      ))
    }
    {/* <li className="page-item"><a className="page-link" href="#">1</a></li> */}
    {/* <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li> */}
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
</div>
      </>
    );
  }
}
