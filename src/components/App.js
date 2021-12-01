// import '../App.css';
import { useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import { ThemeContext } from "../context/theme";
import Modal from './modal/Modal';
import Header from './Header';
import Jobs from './Jobs';
import UserForm from './UserForm';
import EventCalendar from './EventCalendar';

function App() {
  const { theme } = useContext(ThemeContext);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));
  const [jobs, setJobs] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jobs`)
      .then(resp => resp.json())
      .then(data => {
        setJobs(data);
      });

    fetch(`${process.env.REACT_APP_API_URL}/communications`)
      .then(resp => resp.json())
      .then(data => {
        setCommunications(data);
      });

    fetch(`${process.env.REACT_APP_API_URL}/events`)
      .then(resp => resp.json())
      .then(data => {
        setEvents(data);
      });
  }, []);

  const addRecord = (setter, newRecord) => {
    setter(currentRecords => [...currentRecords, newRecord]);
  };

  const updateRecord = (setter, updatedRecord) => {
    setter(currentRecords => currentRecords.map(oldRecord => (
      oldRecord.id === updatedRecord.id ? updatedRecord : oldRecord
    )));
  };

  const deleteRecord = (setter, deletedRecord) => {
    setter(currentRecords => currentRecords.filter(record => record.id !== deletedRecord.id));
  };

  function State(records, setter) {
    this.records = records;
    this.add = record => addRecord(setter, record);
    this.update = record => updateRecord(setter, record);
    this.delete = record => deleteRecord(setter, record);
  };

  const jobState = new State(jobs, setJobs);
  const communicationState = new State(communications, setCommunications);
  const eventState = new State(events, setEvents);

  // const jobState = {
  //   records: jobs,
  //   add: (record) => addRecord(setJobs, record),
  //   update: (record) => updateRecord(setJobs, record),
  //   delete: (record) => deleteRecord(setJobs, record)
  // };

  // const eventState = {
  //   records: events,
  //   add: (record)
  // };

  const handleUserIdUpdate = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <Document themeMode={theme}>
      <Modal jobState={jobState} communicationState={communicationState} eventState={eventState} />
      <AppContainer themeMode={theme}>
        <Header userId={userId} handleUserIdUpdate={handleUserIdUpdate} />
        <Body>
          <Routes>
            <Route path="/" element={<Jobs userId={userId} jobState={jobState} />} />
            <Route path="login" element={<UserForm userId={userId} handleUserIdUpdate={handleUserIdUpdate} />} />
            <Route path='calendar' element={<EventCalendar userId={userId} eventState={eventState} />} />
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