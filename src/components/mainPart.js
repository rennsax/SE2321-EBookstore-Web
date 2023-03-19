import React, { Component } from 'react'
import BookList from './BookList'
import SearchBar from './SearchBar'
import BookCarousel from './Carousel'
import Blank from './util'

export default class MainPart extends Component {
  render() {
    return (
      <div className='main-part'>
        <SearchBar/>
        <Blank vertical="10px"/>
        <BookCarousel/>
        <Blank vertical="20px"/>
        <BookList numList={[0, 1, 2, 3]}/>
        <Blank vertical="20px"/>
        <BookList numList={[4, 5, 6, 7]}/>
      </div>
    )
  }
}
