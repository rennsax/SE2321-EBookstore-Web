import { CaretDown, CaretUp, Trash } from "assets/icons";
import { Link } from "react-router-dom";

import config from "config/front.json";
import { updateOrderItem } from "service/OrderService";
import { UserInfoContext } from "view/HomePage";
import { useContext } from "react";

interface BookBuyInfo {
  book: Book;
  quantity: number;
}

export type BookBuyProps = BookBuyInfo & {
  refetch: () => void;
};

export default function BookBuyCard({ quantity, book, refetch }: BookBuyProps) {
  const { uuid, picId, author, title, price } = book;

  const orderId = useContext(UserInfoContext)?.orderId as number;

  const handleDelete = (e: ButtonEvent): void => {
    e.preventDefault();
    updateOrderItem(orderId, uuid, -quantity).then(() => {
      refetch();
    });
  };

  const handleIncrease = (): void => {
    updateOrderItem(orderId, uuid, 1).then(() => {
      refetch();
    });
  };

  const handleDecrease = (): void => {
    updateOrderItem(orderId, uuid, -1).then(() => {
      refetch();
    });
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
          <span data-text={quantity}></span>
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
