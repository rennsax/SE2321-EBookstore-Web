import React, { Component } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import BookCarousel from './Carousel'
import '../../css/BookPage.css'

export default class BookPage extends Component {
  render() {
    return (
      <div className='book-page'>
        <SearchBar/>
        <BookCarousel/>
        <BookList perRow={4}/>
      </div>
    )
  }
}
