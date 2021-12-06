import styled from "styled-components";
// import GridViewIcon from '@mui/icons-material/GridView';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { ThemeContext } from "../context/theme";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from "react-router-dom";
import { logout } from '../shared/utils';
import IconLink from './common/IconLink';

interface HeaderProps {
  username: string | undefined,
  handleUsernameUpdate: Function
};

function Header({ username, handleUsernameUpdate }: HeaderProps) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <HeaderBar themeMode={theme}>
      <span className='left-icons'>
        {/* <GridViewIcon /> */}
        <Link to='/jobs'>
          <IconLink tooltip={{position: 'bottom', text: 'Jobs'}}>
            <ListAltIcon />
          </IconLink>
        </Link>
        <Link to='/calendar'>
          <IconLink tooltip={{position: 'bottom', text: 'Events'}}>
            <CalendarTodayIcon />
          </IconLink>
        </Link>
      </span>
      <Link to='/'>
        <h1>AppliTracker</h1>
      </Link>
      <span className='right-icons'>
        <IconLink tooltip={{position: 'bottom', text: theme === 'dark' ? 'Light Mode' : 'Dark Mode'}}>
          { theme === 'dark' ? <LightModeIcon onClick={() => setTheme('light')} /> : <DarkModeIcon onClick={() => setTheme('dark')} /> }
        </IconLink>
        <IconLink tooltip={{position: 'bottom', text: username ? 'Logout' : 'Login'}}>
          { username === undefined ? <Link to='/login'><LoginIcon /></Link> : <LogoutIcon onClick={() => logout(handleUsernameUpdate)} /> }
        </IconLink>
      </span>
    </HeaderBar>
  )
}

export default Header;

const HeaderBar = styled.div<{themeMode: 'light' | 'dark'}>`
  /* text-align: center; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;

  background-color: ${props => props.theme.colors[props.themeMode].header.background};
  color: ${props => props.theme.colors[props.themeMode].header.text};
  border-radius: 3px;

  h1 {
    display: inline-block;
    margin: 0;
    color: ${props => props.theme.colors[props.themeMode].header.text};
  }

  svg {
    color: ${props => props.theme.colors[props.themeMode].header.link};
    &:hover {
      color: ${props => props.theme.colors[props.themeMode].header.linkHover};
    }
  }

  .left-icons, .right-icons {
    display: flex;
    justify-content: space-between;
    max-width: 70px;
    flex-grow: 1;
  }

  /* .left-icons {
    float: left;
  }

  .right-icons {
    float: right;
  } */
`;
