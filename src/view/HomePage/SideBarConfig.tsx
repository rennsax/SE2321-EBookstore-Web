import { ImportContacts, ListAlt, ShoppingCart } from "@mui/icons-material";
import { NavigateBar } from "components/SideBar";

const homePageBars: NavigateBar[] = [
  {
    className: "to-page-book",
    to: "books",
    primary: "Books",
    children: <ImportContacts />,
  },
  {
    className: "to-page-cart",
    to: "cart",
    primary: "My Cart",
    children: <ShoppingCart />,
  },
  {
    className: "to-page-order",
    to: "orders",
    primary: "My Orders",
    children: <ListAlt />,
  },
];

export default homePageBars;
