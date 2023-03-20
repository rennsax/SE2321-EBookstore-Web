import React, { Component } from 'react'
import { bookNumber } from './Book'
import '../../css/BookList.css'

export default class BookList extends Component {
  createList = () => {
    const {numList} = this.props;
    let res = [];
    for (let i = 0; i < 4; ++i) {
      res.push(bookNumber(numList[i]));
    }
    res.map((obj) => {
      return <div>{obj}</div>;
    })
    return res;
  }

  render() {
    return (
      <div className='book-list'>
        {this.createList()}
      </div>
    )
  }
}
