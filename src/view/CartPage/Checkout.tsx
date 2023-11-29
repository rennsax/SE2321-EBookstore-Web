import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { cardTypes } from "assets/card-type";
import { RightArrow } from "assets/icons";
import { memo, useEffect, useRef, useState } from "react";
import { checkoutOrder } from "service/OrderService";
import useUserInfo from "utils/useUserInfo";

interface CardTypeProps {
  typePic: string;
  typeName: string;
}

const CardType = memo(function CardType({ typePic, typeName }: CardTypeProps) {
  return (
    <li className="card-type__list__item">
      <label>
        <input type="radio" name="card_type" value={typeName} />
        <img src={typePic} alt={typeName} />
      </label>
    </li>
  );
});

const CardTypeList = memo(function CardTypeList() {
  const createList = () => {
    const res = [];
    for (let i = 0; i < 4; ++i)
      res.push(
        <CardType
          key={`card_type${i}`}
          typeName={cardTypes[i][0]}
          typePic={cardTypes[i][1]}
        />
      );
    return res;
  };

  return (
    <div className="card-type">
      <div className="card-type__header">Card type</div>
      <ul className="card-type__list">{createList()}</ul>
    </div>
  );
});

export default function Checkout({
  // avatar,
  sumBudget,
}: {
  avatar: string;
  sumBudget: string;
}) {
  // const shipPrice = config["cart.shipPrice"];
  // TODO ship price
  const dateRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { orderId, refetch: updateCart } = useUserInfo();

  const handleCheckout = async () => {
    if (orderId === undefined) {
      setAlertOpen(true);
    } else {
      await checkoutOrder(orderId);
      updateCart();
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    if (alertOpen === true) {
      return;
    }
    setDialogOpen(false);
  }, [alertOpen]);

  const handleClickCheckout = (e: ButtonEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <form className="pay">
      <div className="pay__header flex-space-between">
        <div className="pay__header__title">
          <h3>Card details</h3>
        </div>
        {/* @deprecated */}
        {/* <div className="pay__header__avatar display-circle">
          <img src={avatar} alt="user-avatar" />
        </div> */}
      </div>
      <CardTypeList />
      <div className="pay__info">
        <label>
          <div>Name on card</div>
          <input
            className="pay__info__input"
            placeholder="Name"
            autoComplete="true"
            type="text"
            name="pay_name"
          />
        </label>
      </div>
      <div className="pay__info">
        <label>
          <div>Card number</div>
          <input
            className="pay__info__input"
            placeholder="0000 0000 0000 0000"
            autoComplete="true"
            type="text"
            name="pay_number"
          />
        </label>
      </div>
      <div className="pay__info flex-space-between">
        <label>
          <div>Date</div>
          <input
            className="pay__info__input"
            placeholder="2023/1/1"
            autoComplete="true"
            type="text"
            name="pay_date"
            ref={dateRef}
          />
        </label>
        <div style={{ width: "10px" }}></div>
        <label>
          <div>CVV</div>
          <input
            className="pay__info__input"
            placeholder="000000"
            autoComplete="true"
            type="text"
            name="pay_cvv"
          />
        </label>
      </div>
      <hr />
      <div className="pay__result flex-space-between">
        <div>Subtotal</div>
        <div>{`$${sumBudget}`}</div>
      </div>
      <div className="pay__result flex-space-between">
        <div>Shipping</div>
        <div>{"0.00"}</div>
      </div>
      <div className="pay__result flex-space-between">
        <div>Total(Incl. taxes)</div>
        <div>{`$${sumBudget}`}</div>
      </div>

      <button
        className="pay__submit flex-space-between"
        onClick={handleClickCheckout}
        tabIndex={-1}
      >
        <div>{`$${sumBudget}`}</div>
        <div className="flex-space-between">
          <div style={{ marginRight: "10px" }}>Checkout</div>
          <RightArrow />
        </div>
      </button>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to checkout?"}
        </DialogTitle>
        <DialogContent className="co-dialog">
          <DialogContentText id="alert-dialog-description">
            You need to pay
            <span className="co-dialog__price">${sumBudget}</span>
            for this order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: "none" }}
            variant="outlined"
          >
            Let me consider...
          </Button>
          <Button
            onClick={handleCheckout}
            autoFocus
            sx={{ textTransform: "none" }}
            variant="outlined"
          >
            Checkout!
          </Button>
        </DialogActions>
      </Dialog>

      {/* TODO use my snackbar */}
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          elevation={4}
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setAlertOpen(false)}
        >
          An error occurs. Please retry later.
        </Alert>
      </Snackbar>
    </form>
  );
}
