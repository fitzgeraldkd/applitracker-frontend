// import '../App.css';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import Jobs from './Jobs';
import { useState, useContext } from 'react';
import { ThemeContext } from "../context/theme";
import UserForm from './UserForm';
import EventCalendar from './EventCalendar';

function App() {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  const handleUserIdUpdate = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <Document themeMode={theme}>
      <AppContainer themeMode={theme}>
        <Header userId={userId} handleUserIdUpdate={handleUserIdUpdate} />
        <Body>
          <Routes>
            <Route path="/" element={<Jobs userId={userId} />} />
            <Route path="login" element={<UserForm userId={userId} handleUserIdUpdate={handleUserIdUpdate} />} />
            <Route path='calendar' element={<EventCalendar />} userId={userId} />
          </Routes>
        </Body>
      </AppContainer>
    </Document>
  );
}

export default App;

const Document = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${props => props.theme.colors[props.themeMode].body.background};
  
  & * {
    transition: color 0.1s, background-color 0.1s;
  }

`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: auto;
  margin-top: 10px;
  padding: 10px;
  background-color: ${props => props.theme.colors[props.themeMode].app.background};
  color: ${props => props.theme.colors[props.themeMode].app.text};
  border-radius: 3px;
`;

const Body = styled.div`
  padding-top: 20px;
`;