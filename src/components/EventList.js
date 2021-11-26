import styled from 'styled-components';

function EventList({ activeDay }) {

  return (
    <EventListGrid>
      Events for: {activeDay.toLocaleDateString()}
    </EventListGrid>
  );
}

export default EventList;

const EventListGrid = styled.div`
`;