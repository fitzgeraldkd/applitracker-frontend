import styled from "styled-components";
import GridViewIcon from '@mui/icons-material/GridView';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { ThemeContext } from "../context/theme";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from "react-router-dom";

interface HeaderProps {
  userId: any,
  handleUserIdUpdate: Function
};

function Header({ userId, handleUserIdUpdate }: HeaderProps) {
  const { theme, setTheme } = useContext(ThemeContext);

  const logout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/logout`)
      .then(resp => resp.json())
      .then(data => {
        localStorage.removeItem('login_token');
        localStorage.removeItem('user_id');
        handleUserIdUpdate(null);
      })
  };

  return (
    <HeaderBar themeMode={theme}>
      <span className='left-icons'>
        <GridViewIcon />
        <ListAltIcon />
        <Link to='/calendar'>
          <CalendarTodayIcon />
        </Link>
        { theme === 'dark' ? <LightModeIcon onClick={() => setTheme('light')} /> : <DarkModeIcon onClick={() => setTheme('dark')} /> }
        
        
      </span>
      <Link to='/'>
      <h1>AppliTracker</h1>
      </Link>
      <span className='right-icons'>
        <Link to='/login'>
          <LoginIcon />
        </Link>
        <LogoutIcon onClick={logout} />
      </span>
    </HeaderBar>
  )
}

export default Header;

const HeaderBar = styled.div<{themeMode: 'light' | 'dark'}>`
  text-align: center;
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

  .left-icons {
    float: left;
  }

  .right-icons {
    float: right;
  }
`;
