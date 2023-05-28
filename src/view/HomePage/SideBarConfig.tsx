import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavigateBar } from "components/SideBar";

const homePageBars: NavigateBar[] = [
  {
    className: "to-page-book",
    to: "books",
    primary: "Books",
    children: <ImportContactsIcon />,
  },
  {
    className: "to-page-cart",
    to: "cart",
    primary: "My Cart",
    children: <ShoppingCartIcon />,
  },
  {
    className: "to-page-order",
    to: "orders",
    primary: "My Orders",
    children: <ListAltIcon />,
  },
];

export default homePageBars;