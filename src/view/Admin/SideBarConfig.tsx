import { NavigateBar } from "components/SideBar";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const adminSideBars: NavigateBar[] = [
  {
    primary: "Users",
    to: "users",
    children: <SupervisedUserCircleIcon />
  }
]

export default adminSideBars;