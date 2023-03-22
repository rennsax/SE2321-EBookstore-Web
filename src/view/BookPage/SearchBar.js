import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div className='search_bar'>
        {/* <input type="text" autoComplete="off" className="input-bar" placeholder='search for books'/> */}
        <form action="https://www.google.com/search">
          <select name="book_type" id="book-type-selector" className='search_bar__selector'>
            <option value="all">All</option>
            <option value="ed">Education</option>
            <option value="cs">Computer Science</option>
          </select>
          <input
            className='search_bar__input'
            type="text"
            name="q"
            autoComplete='off'
            required
          />
          <button className="search_bar__button" type="submit">
            Search
          </button>
        </form>
      </div>
    )
  }
}
