import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{background:"white", color:"darkblue",padding:'1rem',fontFamily:"sans-serif", fontWeight:"bold", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Link to='/' style={{textDecoration:"none"}}>
        <h1>Movies App</h1>
        </Link>
        <Link to='/fav' style={{textDecoration:"none"}}>
        <h2 style={{marginLeft:"2rem"}}>Favourite</h2>
        </Link>
      </div>
    )
  }
}
