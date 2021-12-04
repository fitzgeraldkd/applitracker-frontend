import React, { useContext } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';

import { ModalContext } from '../context/modal';

import Button from './common/Button';
import IconLink from './common/IconLink';
import { EventRecordType, JobRecordType, StateContainer } from '../shared/types';

interface EventListProps {
  activeDay: Date,
  eventState: StateContainer<EventRecordType>,
  jobState: StateContainer<JobRecordType>
}

function EventList({ activeDay, eventState, jobState }: EventListProps) {
  const { setModal } = useContext(ModalContext);

  const events = eventState.records
    .filter(event => new Date(event.date).toDateString() === activeDay.toDateString())
    .sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0
    })
    .map(event => {
      const job = jobState.records.find(job => job.id === event.job_id)
      return (
        <React.Fragment key={event.id}>
          <span><IconLink tooltip={{position: 'right', text: 'Edit'}} iconLinkProps={{onClick: () => setModal({modal: 'event', record: event})}}><EditIcon /></IconLink></span>
          <span>{new Date(event.date).toLocaleTimeString().replace(/:\d\d /, ' ')}</span>
          <span>{event.title}</span>
          <span>{job && job.company}</span>
          <span>{job && job.position}</span>
        </React.Fragment>
      );
    });

  return (
    <EventListGrid>
      <span className='header'>
        Events for: {activeDay.toLocaleDateString()}
        <Button buttonProps={{onClick: () => setModal({modal: 'event', options: {date: activeDay}})}}>Add Event</Button>
      </span>
      <span></span>
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
  grid-template-columns: 24px auto auto auto;
  grid-column-gap: 10px;

  .header {
    grid-column: 1 / 6;
  }
`;