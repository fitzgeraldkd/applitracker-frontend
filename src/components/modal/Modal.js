import { useContext } from "react";
import styled from 'styled-components';
import { ModalContext } from '../../context/modal';
import { ThemeContext } from "../../context/theme";
import EventForm from './EventForm.tsx';

function Modal({ jobState, communicationState, eventState }) {
  const { modal, setModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);
  if (modal === undefined) return null;
  return (
    <>
      <ModalBackground onClick={() => setModal()} />
      <ModalContent themeMode={theme}>
        {modal === 'event' && <EventForm eventState={eventState} />}
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

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: ${props => props.theme.colors[props.themeMode].app.background};
  color: ${props => props.theme.colors[props.themeMode].app.text};
z-index: 2;
`;