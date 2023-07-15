import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{background:"lightblue",padding:'1rem',fontFamily:"sans-serif", fontWeight:"bold", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <h1>Movies App</h1>
        <h2 style={{marginLeft:"2rem"}}>Favourite</h2>
      </div>
    )
  }
}
