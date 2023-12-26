import { Menu } from 'react-admin';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from "@mui/icons-material/Search";
import WarningIcon from "@mui/icons-material/Warning";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";


export const AppMenu = (props) => (
    <Menu {...props}>
        <Menu.DashboardItem />
        <Menu.Item to="/search" primaryText="Search" leftIcon={<SearchIcon />}/>
        <Menu.Item to="/about" primaryText="About" leftIcon={<HelpIcon />}/>
    </Menu>
);