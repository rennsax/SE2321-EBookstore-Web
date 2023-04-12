import React from "react";
import { Link } from "react-router-dom";
import { LeftArrow } from "assets/icons";

export default function BackToBookPage() {
  return (
    <>
      <Link to="/home/books">
        <div className="cart-page__left__back">
          <LeftArrow />
          <h4>Continue Shopping</h4>
        </div>
      </Link>
    </>
  );
}
