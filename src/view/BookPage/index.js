import React, { Component } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import BookCarousel from './Carousel'
import '../../css/BookPage.css'

export default class BookPage extends Component {
  render() {
    return (
      <div className='main-right book-page'>
        <SearchBar/>
        <BookCarousel/>
        <BookList numList={[0, 1, 2, 3]}/>
        <BookList numList={[4, 5, 6, 7]}/>
      </div>
    )
  }
}
