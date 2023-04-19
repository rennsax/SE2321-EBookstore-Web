import { CaretDown, CaretUp, Trash } from "assets/icons";
import { Link } from "react-router-dom";

import config from "config/front.json";

interface BookBuyInfo {
  bookContent: BookContent;
  count: number;
}

export type BookBuyProps = BookBuyInfo & BooksInCartState;

export default function BookBuyCard({
  count,
  bookContent,
  booksInCart,
  setBooksInCart,
}: BookBuyProps) {
  const { uuid, picId, author, title, price } = bookContent;

  const handleDelete = (e: ButtonEvent): void => {
    e.preventDefault();
    setBooksInCart(booksInCart.filter((book) => book.bookId !== uuid));
  };

  const handleIncrease = (): void => {
    const booksInCartNew = [...booksInCart];
    for (const book of booksInCartNew) {
      if (book.bookId === uuid) {
        book.count += 1;
        break;
      }
    }
    setBooksInCart(booksInCartNew);
  };

  const handleDecrease = (): void => {
    const booksInCartNew = [...booksInCart];
    for (const book of booksInCartNew) {
      if (book.bookId === uuid) {
        book.count -= 1;
        break;
      }
    }
    setBooksInCart(booksInCartNew.filter((book) => book.count > 0));
  };

  return (
    <div className="cart-card flex-space-between">
      <div className="cart-card__info flex-space-between">
        <div className="cart-card__info__pic">
          <Link to={`/home/bd/${uuid}`}>
            <img
              src={`${config["book.picture.url"]}/${picId}.jpg`}
              alt="book1"
            />
          </Link>
        </div>
        <div className="cart-card__info__text flex-space-between">
          <div className="cart-card__info__text__title">
            <h5>{title}</h5>
          </div>
          <div className="cart-card__info__text__details">{author}</div>
        </div>
      </div>
      <div className="cart-card__right flex-space-between">
        <div className="cart-card__right__num">
          <div className="icon-container" onClick={handleIncrease}>
            <CaretUp />
          </div>
          <span data-text={count}></span>
          <div className="icon-container" onClick={handleDecrease}>
            <CaretDown />
          </div>
        </div>
        <div className="cart-card__right__price">{`$${price}`}</div>
        <div className="cart-card__right__delete" onClick={handleDelete}>
          <Trash />
        </div>
      </div>
    </div>
  );
}
