import { NavigateBar } from "components/SideBar";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

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
];

export default adminSideBars;
