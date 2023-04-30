import { useQuery } from "@tanstack/react-query";
import myFetch from "utils/ajax";
import config from "config/front.json";

export default function OrderItem({ uuid, quantity }: BookOrdered) {
  const { data, isSuccess } = useQuery({
    queryKey: [uuid, "orderItem"],
    queryFn: async () => {
      const data: Book = await myFetch({
        method: "GET",
        url: `${config["url.book.info"]}/${uuid}`,
      }).then(async (res) => {
        return await res.json();
      });
      return data;
    },
  });

  if (isSuccess) {
    const { title, picId, price, author } = data;
    return (
      <div className="order-item">
        <div className="order-item__left">
          <div className="order-item__pic-container">
            <img
              className="order-item__pic"
              src={`${config["url.book.picture"]}/${picId}.jpg`}
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
