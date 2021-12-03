import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../context/modal';
import Fieldset from "../form/Fieldset";
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../common/Button';
import { EventRecordType, JobRecordType, StateContainer } from '../../shared/types';

interface EventFormProps {
  eventState: StateContainer<EventRecordType>,
  jobState: StateContainer<JobRecordType>,
  event: EventRecordType | undefined,
  options: {
    date: Date,
    [key: string]: any
  }
};

function EventForm({ eventState, jobState, event, options }: EventFormProps) {
  console.log(options);
  const getDateValue = (date: Date) => {
    return [
      date.getFullYear(), 
      (date.getMonth() + 1).toString().padStart(2, '0'), 
      date.getDate().toString().padStart(2, '0')
    ].join('-')
  };

  const getTimeValue = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  // const [jobs, setJobs] = useState([] as JobRecordType[]);
  if (event) console.log(new Date(event.date).getDate());
  const [eventData, setEventData] = useState({
    title: event ? event.title : '',
    description: event ? event.description : '',
    date: event ? getDateValue(new Date(event.date)) : new Date(options.date).toISOString().split('T')[0],
    time: event ? getTimeValue(new Date(event.date)) : "12:00",
    jobId: event ? event.job_id.toString() : ''
  });
  
  const { setModal } = useContext(ModalContext);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/jobs`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setJobs(data);
  //     });
  // }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: EventRecordType = {
      // ...eventData,
      title: eventData.title,
      description: eventData.description,
      date: new Date(eventData.date + ' ' + eventData.time),
      job_id: parseInt(eventData.jobId, 10)
    };
    // delete newEvent.time;
    console.log(newEvent)
    const options = {
      method: event ? 'PATCH' : 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    };
    const endpoint = event ? `/${event.id}` : '';
    fetch(`${process.env.REACT_APP_API_URL}/events${endpoint}`, options)
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      }).then(data => {
        event ? eventState.update(data) : eventState.add(data);
        setModal();
      }).catch(error => {
        console.log(error);
      });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventData(currentEventData => Object.assign({
      ...currentEventData,
      [e.target.name]: e.target.value
    }));
  };

  const jobOptions = jobState.records.map(job => (
    <option key={job.id} value={job.id}>{job.company} ({job.position})</option>
  ));

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {event ? "Edit Event" : "Add an Event" }
        <Fieldset fieldsetProps={{}}>
          <Select label='Job: ' selectProps={{name: 'jobId', value: eventData.jobId, onChange: handleFormChange}}>
            <option value=''></option>
            {jobOptions}
          </Select>
          <Input label='Title:' inputProps={{name: 'title', value: eventData.title, onChange: handleFormChange}} />
          <Input label='Description:' inputProps={{name: 'description', value: eventData.description, onChange: handleFormChange}} />
          <Input label='Date:' inputProps={{type: 'date', name: 'date', value: eventData.date, onChange: handleFormChange}} />
          <Input label='Time:' inputProps={{type: 'time', name: 'time', value: eventData.time, onChange: handleFormChange}} />
          <span></span>
          <Button buttonProps={{type: 'submit'}}>Submit</Button>
        </Fieldset>
      </form>
    </>
  );
}

export default EventForm;