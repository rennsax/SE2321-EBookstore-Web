export default function CartHeader({ number }: { number: number }) {
  return (
    <div className="cart-header">
      <div className="cart-header__title">
        <h4>Your shopping cart</h4>
      </div>
      <div className="cart-header__info">
        <span className="cart-header__info__num">
          <span style={{ fontWeight: "700" }}>{number}</span> book(s)
        </span>
        <div className="cart-header__info__sort">
          <span>Sort by: </span>
          <select name="sort_type" id="sort_type">
            <option value="price">price</option>
            <option value="alphabet">alphabet</option>
          </select>
        </div>
      </div>
    </div>
  );
}
