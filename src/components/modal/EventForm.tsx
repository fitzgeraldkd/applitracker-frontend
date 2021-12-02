import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Fieldset from "../form/Fieldset";
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../common/Button';
import { EventRecordType, JobRecordType, StateContainer } from '../../shared/types';

interface EventFormProps {
  eventState: StateContainer<EventRecordType>
};

function EventForm({ eventState }: EventFormProps) {
  const [jobs, setJobs] = useState([] as JobRecordType[]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: "12:00",
    status: '',
    jobId: ''
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jobs`)
      .then(resp => resp.json())
      .then(data => {
        setJobs(data);
      });
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: EventRecordType = {
      // ...eventData,
      title: eventData.title,
      description: eventData.description,
      date: new Date(eventData.date + ' ' + eventData.time),
      status: eventData.status,
      job_id: parseInt(eventData.jobId, 10)
    };
    // delete newEvent.time;
    console.log(newEvent)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    };
    fetch(`${process.env.REACT_APP_API_URL}/events`, options)
      .then(resp => resp.json())
      .then(data => {
        eventState.add(data);
      });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventData(currentEventData => Object.assign({
      ...currentEventData,
      [e.target.name]: e.target.value
    }));
  };

  const jobOptions = jobs.map(job => (
    <option key={job.id} value={job.id}>{job.company} ({job.position})</option>
  ));

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        Add an Event
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