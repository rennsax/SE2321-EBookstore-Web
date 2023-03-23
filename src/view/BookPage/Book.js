import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Book extends Component {
  render() {
    const { bookName, picSrc, price, bookAbb } = this.props;
    return (
      <Link to={"/books/" + bookAbb}>
        <div className="book-card">
          <div className="book-card__pic">
            <img alt={"book picture of" + bookName} src={picSrc}></img>
          </div>
          <div className="book-card__info">
            <div className="book-card__info__name">
              {bookName}
            </div>
            <div className="book-card__info__price">
              {"￥" + price}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

const bookNames = [
  "深入理解LINUX内核（第3版）", "Git版本控制管理（第2版）", "C程序设计语言（典藏版）",
  "Java核心技术（卷I）", "深入理解计算机系统（第3版）", "流畅的Python", "数据挖掘（原理与实践）",
  "微积分教程"
];
const picSrcs = [
  "//img12.360buyimg.com/n1/jfs/t1/65060/7/23286/47553/636e7525Ebe92a18f/aec35cd2397c6cc1.jpg.avif",
  "//img11.360buyimg.com/n1/s200x200_jfs/t1/47589/16/19550/275200/62d90fd1E2f8d23c1/f1c12809e83e246d.jpg.avif",
  "https://images-cn.ssl-images-amazon.cn/images/I/51PLYzvpmHL._SX356_BO1,204,203,200_.jpg",
  "http://img3m2.ddimg.cn/1/1/28487152-1_w_10.jpg",
  "http://img3m9.ddimg.cn/41/9/25060109-1_b_6.jpg",
  "http://img3m1.ddimg.cn/64/32/25071121-1_b_9.jpg",
  "http://img3m6.ddimg.cn/23/27/29177006-1_b_8.jpg",
  "http://img3m0.ddimg.cn/49/21/1207935580-1_b_1.jpg"
];
const prices = [180, 30, 60, 100, 240, 109, 69, 280];

const bookInfo = { bookNames: bookNames, picSrcs: picSrcs, prices: prices };

const bookAbb = ["linux", "git", "cpl", "java", "csapp", "python", "data", "diff"];

export function bookNumber(i) {
  return (
    <Book bookName={bookInfo.bookNames[i]} picSrc={bookInfo.picSrcs[i]} price={bookInfo.prices[i]}
      bookAbb={bookAbb[i]}
    />
  )
}