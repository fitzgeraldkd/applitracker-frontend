import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ModalContext } from '../../context/modal';
import Fieldset from "../form/Fieldset";
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../common/Button';
import { CommunicationRecordType, JobRecordType, StateContainer, ValidRecordType } from '../../shared/types';
import { sendRequest } from "../../shared/utils";

interface EventFormProps {
  communicationState: StateContainer<CommunicationRecordType>,
  jobState: StateContainer<JobRecordType>,
  communication: CommunicationRecordType | undefined,
  options: {
    date: Date,
    [key: string]: any
  }
};

function EventForm({ communicationState, jobState, communication, options }: EventFormProps) {
  const [disableForm, setDisableForm] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [allowDelete, setAllowDelete] = useState(false);
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
  
  const [communicationData, setCommunicationData] = useState({
    heading: communication ? communication.heading : '',
    description: communication ? communication.description : '',
    date: communication ? getDateValue(new Date(communication.time)) : new Date().toISOString().split('T')[0],
    time: communication ? getTimeValue(new Date(communication.time)) : "12:00",
    received: communication ? communication.received : false,
    contact: communication ? communication.contact : '',
    jobId: communication ? communication.job_id.toString() : ''
  });
  
  const { setModal } = useContext(ModalContext);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCommunication: CommunicationRecordType = {
      heading: communicationData.heading,
      description: communicationData.description,
      time: new Date(communicationData.date + ' ' + communicationData.time),
      received: communicationData.received,
      contact: communicationData.contact,
      job_id: parseInt(communicationData.jobId, 10)
    };

    const options = {
      method: communication ? 'PATCH' : 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCommunication)
    };

    const endpoint = '/communications' + (communication ? `/${communication.id}` : '');
    const callback = (communicationRecord: (CommunicationRecordType & ValidRecordType)) => {
      communication ? communicationState.update(communicationRecord) : communicationState.add(communicationRecord);
      setModal();
    };
    const catchCallback = (errors: string[]) => {
      setDisableForm(false);
      setWarnings(errors);
    };
    setDisableForm(true);
    sendRequest<CommunicationRecordType & ValidRecordType>({endpoint, callback, catchCallback, options});
  };

  const handleDelete = () => {
    if (!communication) return null;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    const endpoint = `/communications/${communication.id}`;
    const callback = () => {
      communicationState.delete(communication);
      setModal();
    }
    const catchCallback = (errors: string[]) => {
      setDisableForm(false);
      setWarnings(errors);
    };
    setDisableForm(true);
    sendRequest<null>({endpoint, callback, catchCallback, options})
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunicationData(currentCommunicationData => Object.assign({
      ...currentCommunicationData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleAllowDelete = (e: ChangeEvent<HTMLInputElement>) => {
    setAllowDelete(e.target.checked);
  };

  const jobOptions = jobState.records.map(job => (
    <option key={job.id} value={job.id}>{job.company} ({job.position})</option>
  ));

  const deleteInput = (
    <>
      <Input inputProps={{name: 'delete', type:'checkbox', checked: allowDelete, onChange: handleAllowDelete}} />
      <Button buttonProps={{type: 'button', disabled: !allowDelete, onClick: handleDelete}}>Delete</Button>
    </>
  );

  return (
    <form onSubmit={handleFormSubmit}>
      {communication ? "Edit Communication" : "Add a Communication" }
      <Fieldset fieldsetProps={{disabled: disableForm}}>
        <Select label='Job: ' selectProps={{name: 'jobId', value: communicationData.jobId, onChange: handleFormChange}}>
          <option value=''></option>
          {jobOptions}
        </Select>
        <Input label='Heading:' inputProps={{name: 'heading', value: communicationData.heading, onChange: handleFormChange}} />
        <Input label='Description:' inputProps={{name: 'description', value: communicationData.description, onChange: handleFormChange}} />
        <Input label='Date:' inputProps={{type: 'date', name: 'date', value: communicationData.date, onChange: handleFormChange}} />
        <Input label='Time:' inputProps={{type: 'time', name: 'time', value: communicationData.time, onChange: handleFormChange}} />
        <Input label='Received:' inputProps={{type: 'checkbox', name: 'received', checked: communicationData.received, onChange: handleFormChange}} />
        <Input label='Contact:' inputProps={{name: 'contact', value: communicationData.contact, onChange: handleFormChange}} />
        <span></span>
        <Button buttonProps={{type: 'submit'}}>Submit</Button>
        {communication ? deleteInput : null}
      </Fieldset>
      {warnings.map(warning => <div key={warning}>{warning}</div>)}
    </form>
  );
}

export default EventForm;