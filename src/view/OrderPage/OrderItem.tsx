import { useQuery } from "@tanstack/react-query";
import { getBookByUuid } from "service/BookService";
import api from "service/api.json";

export default function OrderItem({ uuid, quantity }: BookOrdered) {
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
          <div className="order-item__pic-container">
            <img
              className="order-item__pic"
              src={`${api["book.picture"]}/${picId}.jpg`}
              alt=""
            />
          </div>
          <div className="order-item__info">
            <h3 className="order-item__info__title">{title}</h3>
            <h5 className="order-item__info__author">{author}</h5>
          </div>
        </div>
        <div className="order-item__right">
          <span className="order-item__price">{`$${price}`}</span>
          <span className="order-item__qty">{`qty: ${quantity}`}</span>
        </div>
      </div>
    );
  }

  return <></>;
}
