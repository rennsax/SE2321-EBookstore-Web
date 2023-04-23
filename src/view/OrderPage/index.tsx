import { useQuery } from "@tanstack/react-query";
import "css/OrderPage.css";
import OrderItem from "./OrderItem";

export default function OrderPage() {
  const { data: bookOrderedList, isSuccess } = useQuery({
    queryKey: ["bookOrderedList"],
    queryFn: async () => {
      const data: BookOrdered[] = await fetch(
        "http://localhost:8080/order/current"
      ).then(async (res) => {
        return await res.json();
      });
      return data;
    },
  });
  if (isSuccess) {
    return <div>
      <header>
        Order Id: {213912388123}
      </header>
    <OrderItem {...bookOrderedList[0]}/>
    <OrderItem {...bookOrderedList[1]}/>
    </div>
  }

  return (
    <></>
  )
}
