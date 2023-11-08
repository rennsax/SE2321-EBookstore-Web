import {
  BarChart,
  LibraryBooks,
  ListAlt,
  SupervisedUserCircle,
} from "@mui/icons-material";
import { NavigateBar } from "components/SideBar";

const adminSideBars: NavigateBar[] = [
  {
    primary: "Users",
    to: "users",
    children: <SupervisedUserCircle />,
  },
  {
    primary: "Books",
    to: "books",
    children: <LibraryBooks />,
  },
  {
    primary: "Orders",
    to: "orders",
    children: <ListAlt />,
  },
  {
    primary: "Statistic",
    to: "statistic",
    children: <BarChart />,
  },
];

export default adminSideBars;
