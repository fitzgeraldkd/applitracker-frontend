import { useEffect, useState } from 'react';
import Fieldset from "../form/Fieldset";
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../common/Button';

function EventForm({ eventState }) {
  const [jobs, setJobs] = useState([]);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: "12:00",
    status: '',
    job_id: null
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jobs`)
      .then(resp => resp.json())
      .then(data => {
        setJobs(data);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventData,
      date: new Date(eventData.date + ' ' + eventData.time)
    };
    delete newEvent.time;
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

  const handleFormChange = (e) => {
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
        <Fieldset>
          <Select name='job_id' label='Job: ' value={eventData.job_id} onChange={handleFormChange}>
            <option value={null}></option>
            {jobOptions}
          </Select>
          <Input name='title' label='Title:' value={eventData.title} onChange={handleFormChange} />
          <Input name='description' label='Description:' value={eventData.description} onChange={handleFormChange} />
          <Input type='date' name='date' label='Date:' value={eventData.date} onChange={handleFormChange} />
          <Input type='time' name='time' label='Time:' value={eventData.time} onChange={handleFormChange} />
          <span></span>
          <Button type='submit'>Submit</Button>
        </Fieldset>
      </form>
    </>
  );
}

export default EventForm;