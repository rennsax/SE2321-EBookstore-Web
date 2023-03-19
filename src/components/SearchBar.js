import React, { Component } from 'react'
import "../css/SearchBar.css"

export default class SearchBar extends Component {
  render() {
    return (
      <div className='search-bar'>
        <input type="text" autoComplete="off" className="input-bar" placeholder='search for books'/>
        <button className="search-button"><i></i>Search</button>
      </div>
    )
  }
}
