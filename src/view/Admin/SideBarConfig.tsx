import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { NavigateBar } from "components/SideBar";

const adminSideBars: NavigateBar[] = [
  {
    primary: "Users",
    to: "users",
    children: <SupervisedUserCircleIcon />,
  },
  {
    primary: "Books",
    to: "books",
    children: <LibraryBooksIcon />,
  },
  {
    primary: "Orders",
    to: "orders",
    children: <ListAltIcon />,
  },
];

export default adminSideBars;
