import React, { Component } from 'react'
import { bookNumber } from './Book'
import Blank from '../../components/util'
import '../../css/BookList.css'

export default class BookList extends Component {
  createList = () => {
    const {numList} = this.props;
    let res = [];
    res.push(<Blank horizon="40px"/>);
    for (let i = 0; i < 4; ++i) {
      res.push(bookNumber(numList[i]));
      res.push(<Blank horizon="40px"/>);
    }
    res.map((obj) => {
      return <div>{obj}</div>;
    })
    return res;
  }

  render() {
    const {numList} = this.props;
    return (
      <div className='book-list'>
        {this.createList()}
      </div>
    )
  }
}
