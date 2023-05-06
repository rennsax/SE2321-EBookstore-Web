import { useQuery } from "@tanstack/react-query";
import { getBookByUuid } from "service/BookService";
import api from "service/api.json";
import { Link } from "react-router-dom";

export default function OrderItem({ uuid, quantity, totalBudget }: BookOrdered) {
  const { data: book, isSuccess } = useQuery({
    queryKey: [uuid, "orderItem"],
    queryFn: async () => {
      return await getBookByUuid(uuid);
    },
  });

  if (isSuccess) {
    const { title, picId, price, author } = book;
    return (
      <div className="order-item">
        <div className="order-item__left">
          <Link to={`/home/bd/${uuid}`}>
            <div className="order-item__pic-container">
              <img
                className="order-item__pic"
                src={`${api["book.picture"]}/${picId}.jpg`}
                alt=""
              />
            </div>
          </Link>
          <div className="order-item__info">
            <Link to={`/home/bd/${uuid}`}>
              <h3 className="order-item__info__title">{title}</h3>
            </Link>
            <h5 className="order-item__info__author">{author}</h5>
          </div>
        </div>
        <div className="order-item__right">
          <div className="order-item__price">
            <p className="order-item__price__total">{`Cost: $${totalBudget}`}</p>
            <p className="order-item__price__unit">{`Unit price: $${price}`}</p>
          </div>
          <span className="order-item__qty">{`qty: ${quantity}`}</span>
        </div>
      </div>
    );
  }

  return <></>;
}
