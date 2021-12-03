import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ModalContext } from '../../context/modal';
import Fieldset from "../form/Fieldset";
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../common/Button';
import { JobRecordType, StateContainer, ValidRecordType } from '../../shared/types';

interface JobFormProps {
  jobState: StateContainer<JobRecordType>,
  job: (JobRecordType & ValidRecordType) | undefined
}

function JobForm({ jobState, job }: JobFormProps) {
  const [jobData, setJobData] = useState({
    company: job ? job.company : '',
    position: job ? job.position : '',
    status: job ? job.status : '',
    favorite: job ? job.favorite : false
  });

  const { setModal } = useContext(ModalContext);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options = {
      method: job ? 'PATCH' : 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    };

    const endpoint = job ? `/${job.id}` : '';

    fetch(`${process.env.REACT_APP_API_URL}/jobs${endpoint}`, options)
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      }).then(data => {
        job ? jobState.update(data) : jobState.add(data);
        setModal();
      }).catch(error => {
        console.log(error);
      })
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobData(currentJobData => Object.assign({
      ...currentJobData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const statusOptions = ['applying', 'pending', 'interviewing', 'offered', 'rejected'];
  
  return (
    <form onSubmit={handleFormSubmit}>
      Add a Job
      <Fieldset fieldsetProps={{}}>
        <Input label='Company:' inputProps={{name: 'company', value: jobData.company, onChange: handleFormChange}} />
        <Input label='Position:' inputProps={{name: 'position', value: jobData.position, onChange: handleFormChange}} />
        <Select label='Status:' selectProps={{name: 'status', value: jobData.status, onChange: handleFormChange}}>
          <option value=''></option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status.replace(/./, status[0].toUpperCase())}</option>
          ))}
        </Select>
        <Input label='Favorite:' inputProps={{name: 'favorite', type:'checkbox', checked: jobData.favorite, onChange: handleFormChange}} />
        <span></span>
        <Button buttonProps={{type: 'submit'}}>Submit</Button>
      </Fieldset>
    </form>
  );
}

export default JobForm;