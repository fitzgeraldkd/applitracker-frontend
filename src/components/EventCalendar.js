import Calendar from 'react-calendar';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { ThemeContext } from "../context/theme";
import EventList from './EventList';

function EventCalendar({ eventState }) {
  const { theme } = useContext(ThemeContext);
  const [activeDay, setActiveDay] = useState(new Date());

  const selectDay = (newDay) => {
    setActiveDay(newDay);
  };

  return (
    <>
      <CalendarContainer themeMode={theme}>
        <Calendar value={activeDay} onClickDay={selectDay} calendarType="US" />
      </CalendarContainer>
      <EventList activeDay={activeDay} eventState={eventState} />
    </>
  );
}

export default EventCalendar;

const CalendarContainer = styled.div`
  max-width: 350px;
  margin: auto;

  .react-calendar {
    button {
      background-color: ${props => props.theme.colors[props.themeMode].button.background};
      color: ${props => props.theme.colors[props.themeMode].button.text};
      border-color: ${props => props.theme.colors[props.themeMode].button.border};
      border-style: none;
      border-radius: 3px;
      margin: 3px;
      padding: 5px;
      /* transition: background-color 0.15s, border-color 0.15s; */
      box-sizing: content-box;

      &:hover {
        background-color: ${props => props.theme.colors[props.themeMode].button.hover.background};
      color: ${props => props.theme.colors[props.themeMode].button.hover.text};
      border-color: ${props => props.theme.colors[props.themeMode].button.hover.border};
      }
      
      &:active {
        background-color: ${props => props.theme.colors[props.themeMode].button.active.background};
        color: ${props => props.theme.colors[props.themeMode].button.active.text};
        border-color: ${props => props.theme.colors[props.themeMode].button.active.border};
      }
    }
    .react-calendar__navigation {
      /* display: flex;
      justify-content: space-evenly; */
      /* text-align: center; */
      display: grid;
      grid-template-columns: auto auto 42.8% auto auto;


      .react-calendar__navigation__prev-button,
      .react-calendar__navigation__prev2-button {
        /* float: left; */
      }

      .react-calendar__navigation__label {
        /* flex-grow: 0 !important; */
        font-weight: bold;
      }

      .react-calendar__navigation__next-button,
      .react-calendar__navigation__next2-button {
        /* float: right; */
      }
    }

    .react-calendar__viewContainer {
      .react-calendar__month-view {
        .react-calendar__month-view__weekdays {
          text-align: center;
          /* & * {
            margin: 3px;
          } */
        }
        .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: auto auto auto auto auto auto auto;
          justify-items: center;

          button {
            max-width: initial !important;
            width: 2em;
          }
          
          .react-calendar__month-view__days__day--weekend {
            opacity: 0.75;
          }

          .react-calendar__month-view__days__day--neighboringMonth {
            opacity: 0.5;
          }

          .react-calendar__tile--active {
            border-style: solid;
            margin: 0;
          }
        }
      }
    }
  }
`;