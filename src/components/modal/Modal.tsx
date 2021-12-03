import { useContext } from "react";
import styled from 'styled-components';
import { ModalContext } from '../../context/modal';
import { ThemeContext } from "../../context/theme";
import EventForm from './EventForm';
import JobForm from './JobForm';
import { CommunicationRecordType, EventRecordType, JobRecordType, StateContainer } from '../../shared/types';

interface ModalProps {
  communicationState: StateContainer<CommunicationRecordType>,
  eventState: StateContainer<EventRecordType>,
  jobState: StateContainer<JobRecordType>
};

function Modal({ jobState, communicationState, eventState }: ModalProps) {
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);
  if (modal === undefined) return null;
  return (
    <>
      <ModalBackground onClick={() => setModal()} />
      <ModalContent themeMode={theme}>
        {modal.modal === 'event' && <EventForm eventState={eventState} jobState={jobState} event={modal.record} options={modal.options} />}
        {modal.modal === 'job' && <JobForm jobState={jobState} job={modal.record} />}
      </ModalContent>
    </>
  );
}

export default Modal;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #00000088;
  z-index: 1;
`;

const ModalContent = styled.div<{themeMode: 'light' | 'dark'}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: ${props => props.theme.colors[props.themeMode].app.background};
  color: ${props => props.theme.colors[props.themeMode].app.text};
z-index: 2;
`;