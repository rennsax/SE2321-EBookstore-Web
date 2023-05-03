import OrderItem from "./OrderItem";

export default function OrderInfo({ id, time, bookOrderedList }: OrderInfo) {
  const createOrderList = (): JSX.Element[] => {
    return bookOrderedList.map((bookOrdered, i) => {
      return (<OrderItem {...bookOrdered} key={`bookOrdered${id}${i}`} />);
    });
  };
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  return (
    <div className="order-info">
      <h1 className="order-info__id">
        {"Order ID: " + id.toString()}
      </h1>
      <p className="order-info__date">
        <span>Order data: </span>
        <span>{time.toLocaleDateString("en-US", dateFormat)}</span>
      </p>
      <div className="oi-list">
        {createOrderList()}
      </div>
    </div>
  )

}
