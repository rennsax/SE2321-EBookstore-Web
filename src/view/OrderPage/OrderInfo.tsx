import OrderItem from "./OrderItem";

export default function OrderInfo({ id, time, bookOrderedList }: OrderInfo) {
  const createOrderList = (): JSX.Element[] => {
    return bookOrderedList.map((bookOrdered, i) => {
      return (<OrderItem {...bookOrdered} key={`bookOrdered${id}${i}`} />);
    });
  };
  return <div>{createOrderList()}</div>;
}
