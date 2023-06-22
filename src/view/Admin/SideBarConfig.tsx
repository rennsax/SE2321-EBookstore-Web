import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { NavigateBar } from "components/SideBar";
import BarChartIcon from '@mui/icons-material/BarChart';

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
  {
    primary: "Statistic",
    to: "statistic",
    children: <BarChartIcon />
  }
];

export default adminSideBars;
