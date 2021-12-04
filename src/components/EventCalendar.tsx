import Calendar, { CalendarProps, CalendarTileProperties, Detail, ViewCallbackProperties } from 'react-calendar';
import styled from 'styled-components';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from "../context/theme";
import EventList from './EventList';
import { EventRecordType, JobRecordType, StateContainer } from '../shared/types';
import Button from './common/Button';

interface EventCalendarProps {
  eventState: StateContainer<EventRecordType>,
  jobState: StateContainer<JobRecordType>
};

interface CalendarViewSettings {
  activeStartDate: Date,
  value: Date,
  view: Detail
}

function EventCalendar({ eventState, jobState }: EventCalendarProps) {
  const { theme } = useContext(ThemeContext);
  const [calendarView, setCalendarView] = useState<CalendarViewSettings & CalendarProps>({
    activeStartDate: new Date(),
    value: new Date(),
    view: 'month'
  })

  const selectDay = (newDate: Date) => {
    setCalendarView(currentView => Object.assign({...currentView}, {
      activeStartDate: newDate,
      value: newDate,
      view: 'month'
    }));
  };

  const changeActiveStartDate = (props: ViewCallbackProperties) => {
    const newActiveStartDate = 'activeStartDate' in props ? props.activeStartDate : new Date();
    const newView = 'view' in props ? props.view : 'month';
    setCalendarView(currentView => Object.assign({...currentView}, {
      activeStartDate: newActiveStartDate,
      view: newView
    }));
  };

  const eventDates = useCallback(() => {
    return eventState.records.map(event => event.date)
  }, [eventState]);

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    if (view === 'month') {
      if (eventDates().find(dDate => (
        new Date(dDate).toDateString() === date.toDateString()
      ))) return 'event-date';
    }
    return null;
  };

  return (
    <>
      <CalendarContainer themeMode={theme}>
        <Button buttonProps={{onClick: () => selectDay(new Date())}}>Today</Button>
        <Calendar {...calendarView} onActiveStartDateChange={changeActiveStartDate} onClickDay={selectDay} calendarType="US" tileClassName={tileClassName} />
      </CalendarContainer>
      <EventList activeDay={calendarView.value} eventState={eventState} jobState={jobState} />
    </>
  );
}

export default EventCalendar;

const CalendarContainer = styled.div<{themeMode: 'light' | 'dark'}>`
  max-width: 350px;
  margin: auto;
  text-align: center;

  .react-calendar {
    margin-top: 10px;

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

    .event-date {
      font-weight: bold;
      text-decoration: underline;
      text-shadow: 0 0 2px ${props => props.theme.colors[props.themeMode].link.text};
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