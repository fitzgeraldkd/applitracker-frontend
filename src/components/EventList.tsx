import React, { useContext } from 'react';
import styled from 'styled-components';

import { ModalContext } from '../context/modal';

import Button from './common/Button';
import { EventRecordType, StateContainer } from '../shared/types';

interface EventListProps {
  activeDay: Date,
  eventState: StateContainer<EventRecordType>
}

function EventList({ activeDay, eventState }: EventListProps) {
  const { setModal } = useContext(ModalContext);

  const events = eventState.records
    .filter(event => new Date(event.date).toDateString() === activeDay.toDateString())
    .map(event => (
      <React.Fragment key={event.id}>
        <span>{new Date(event.date).toLocaleTimeString().replace(/:\d\d /, ' ')}</span>
        <span>{event.title}</span>
        <span>Company</span>
        <span>Position</span>
      </React.Fragment>
    ));

  return (
    <EventListGrid>
      <span className='header'>
        Events for: {activeDay.toLocaleDateString()}
        <Button buttonProps={{onClick: () => setModal('event')}}>Add Event</Button>
      </span>
      <span>Time</span>
      <span>Event</span>
      <span>Company</span>
      <span>Position</span>
      {events}
    </EventListGrid>
  );
}

export default EventList;

const EventListGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;

  .header {
    grid-column: 1 / 5;
  }
`;