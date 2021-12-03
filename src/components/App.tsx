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
import { CommunicationRecordType, EventRecordType, JobRecordType, StateContainer, ValidRecordType } from '../shared/types';

function App() {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState<string>();
  const [jobs, setJobs] = useState([] as (JobRecordType & ValidRecordType)[]);
  const [communications, setCommunications] = useState([] as (CommunicationRecordType & ValidRecordType)[]);
  const [events, setEvents] = useState([] as (EventRecordType & ValidRecordType)[]);

  type Setter<RecordType> = React.Dispatch<React.SetStateAction<(RecordType & ValidRecordType)[]>>;

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      };
  
      fetch(`${process.env.REACT_APP_API_URL}/me`, options)
        .then(resp => {
          if (!resp.ok) throw resp;
          return resp.json();
        }).then(data => {
          console.log(data);
          setUsername(data.username);
        });
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      };
  
      fetch(`${process.env.REACT_APP_API_URL}/jobs`, options)
        .then(resp => {
          if (!resp.ok) throw resp;
          return resp.json();
        })
        .then(data => {
          setJobs(data);
        }).catch(error => {
          console.log(error);
          // TODO: wait for json to render
        });
  
      fetch(`${process.env.REACT_APP_API_URL}/communications`, options)
        .then(resp => {
          if (!resp.ok) throw resp;
          return resp.json();
        })
        .then(data => {
          setCommunications(data);
        }).catch(error => {
          console.log(error);
        });
  
      fetch(`${process.env.REACT_APP_API_URL}/events`, options)
        .then(resp => {
          if (!resp.ok) throw resp;
          return resp.json();
        })
        .then(data => {
          setEvents(data);
        }).catch(error => {
          console.log(error);
        });
    } else {
      setJobs([]);
      setCommunications([]);
      setEvents([]);
    }
  }, [username]);

  const addRecord = <RecordType, >(setter: Setter<RecordType>, newRecord: RecordType & ValidRecordType) => {
    setter(currentRecords => [...currentRecords, newRecord]);
  };

  const updateRecord = <RecordType, >(setter: Setter<RecordType>, updatedRecord: RecordType & ValidRecordType) => {
    setter(currentRecords => currentRecords.map(oldRecord => (
      oldRecord.id === updatedRecord.id ? updatedRecord : oldRecord
    )));
  };

  const deleteRecord = <RecordType, >(setter: Setter<RecordType>, deletedRecord: RecordType & ValidRecordType) => {
    setter(currentRecords => currentRecords.filter(record => record.id !== deletedRecord.id));
  };

  class State<RecordType> {
    records: (RecordType & ValidRecordType)[];
    add: (record: RecordType & ValidRecordType) => void;
    update: (record: RecordType & ValidRecordType) => void;
    delete: (record: RecordType & ValidRecordType) => void;
    constructor(records: (RecordType & ValidRecordType)[], setter: React.Dispatch<React.SetStateAction<(RecordType & ValidRecordType)[]>>) {
      this.records = records;
      this.add = record => addRecord<RecordType>(setter, record)
      this.update = (record: RecordType & ValidRecordType) => updateRecord<RecordType>(setter, record)
      this.delete = (record: RecordType & ValidRecordType) => deleteRecord<RecordType>(setter, record)
    }
  }

  const jobState = new State(jobs, setJobs) as StateContainer<JobRecordType>;
  const communicationState = new State(communications, setCommunications) as StateContainer<CommunicationRecordType>;
  const eventState = new State(events, setEvents) as StateContainer<EventRecordType>;

  const handleUsernameUpdate = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <Document themeMode={theme}>
      <Modal jobState={jobState} communicationState={communicationState} eventState={eventState} />
      <AppContainer themeMode={theme}>
        <Header username={username} handleUsernameUpdate={handleUsernameUpdate} />
        <Body>
          <Routes>
            <Route path="/" element={<Jobs jobState={jobState} username={username} />} />
            <Route path="login" element={<UserForm username={username} handleUsernameUpdate={handleUsernameUpdate} />} />
            <Route path='calendar' element={<EventCalendar eventState={eventState} jobState={jobState} />} />
          </Routes>
        </Body>
      </AppContainer>
    </Document>
  );
}

export default App;

const Document = styled.div<{themeMode: ('light' | 'dark')}>`
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

const AppContainer = styled.div<{themeMode: ('light' | 'dark')}>`
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