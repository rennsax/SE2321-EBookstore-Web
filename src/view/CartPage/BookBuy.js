import React, { Component } from 'react'
import { Trash } from '../../assets/icons'

export default class BookBuy extends Component {
  render() {
    return (
      <div className='cart-card flex-space-between'>
        <div className="cart-card__info flex-space-between">
          <div className="cart-card__info__pic">
            <img src={this.props.img} alt="book1" />
          </div>
          <div className="cart-card__info__text flex-space-between">
            <div className="cart-card__info__text__title">
              <h5>{this.props.title}</h5>
            </div>
            <div className="cart-card__info__text__details">{this.props.details}</div>
          </div>
        </div>
        <div className="cart-card__right flex-space-between">
          <div className="cart-card__right__num">1</div>
          <div className="cart-card__right__price">$90</div>
            <a className="cart-card__right__delete">
              <Trash/>
            </a>
        </div>
      </div>
    )
  }
}
