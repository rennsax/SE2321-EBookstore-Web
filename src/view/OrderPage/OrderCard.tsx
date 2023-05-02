import { Link } from "react-router-dom";

type OrderCardProps = {
  orderNumber: number;
  time: Date;
  state: OrderState;
};

export default function OrderCard({
  orderNumber,
  time,
  state,
}: OrderCardProps) {
  return (
    <div className="order-card">
      <Link to={`${orderNumber}`}>
        <div className="order-card__info">
          <h3 className="order-card__number">
            <span>ID: {orderNumber}</span>
          </h3>
          <div className="order-card__time">
            <p>Date: {time.toLocaleDateString()}</p>
            <p>Time: {time.toLocaleTimeString()}</p>
          </div>
          <div className="order-card__state">
            <span>{state.toLocaleUpperCase()}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
