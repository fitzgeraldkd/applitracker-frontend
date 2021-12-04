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
import { sendRequest } from '../shared/utils';

function App() {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState<string>();
  const [jobs, setJobs] = useState([] as (JobRecordType & ValidRecordType)[]);
  const [communications, setCommunications] = useState([] as (CommunicationRecordType & ValidRecordType)[]);
  const [events, setEvents] = useState([] as (EventRecordType & ValidRecordType)[]);

  type Setter<RecordType> = React.Dispatch<React.SetStateAction<(RecordType & ValidRecordType)[]>>;

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      const callback = (newUsername: string) => setUsername(newUsername);
      const catchCallback = (errors: string[]) => {
        errors.forEach(error => console.warn(error));
      };
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      };
      sendRequest<string>({endpoint: '/me', callback, catchCallback, options})
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null) {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      };
      // const catchCallback = (errors: string[]) => errors.forEach(error => console.warn(error));

      {
        const callback = (jobRecords: (JobRecordType & ValidRecordType)[]) => setJobs(jobRecords);
        sendRequest<(JobRecordType & ValidRecordType)[]>({endpoint: '/jobs', callback, options});
      }
      {
        const callback = (communicationRecords: (CommunicationRecordType & ValidRecordType)[]) => setCommunications(communicationRecords);
        sendRequest<(CommunicationRecordType & ValidRecordType)[]>({endpoint: '/communications', callback, options});
      }
      {
        const callback = (eventRecords: (EventRecordType & ValidRecordType)[]) => setEvents(eventRecords);
        sendRequest<(EventRecordType & ValidRecordType)[]>({endpoint: '/events', callback, options});
      }
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

  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

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