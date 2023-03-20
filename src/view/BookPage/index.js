import React, { Component } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import BookCarousel from './Carousel'
import '../../css/book_page.css'

export default class BookPage extends Component {
  render() {
    return (
      <div className='book-page'>
        <SearchBar/>
        <BookCarousel/>
        <BookList numList={[0, 1, 2, 3]}/>
        <BookList numList={[4, 5, 6, 7]}/>
      </div>
    )
  }
}
