import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ModalContext } from '../../context/modal';
import Fieldset from "../form/Fieldset";
import Input from '../form/Input';
import Select from '../form/Select';
import Button from '../common/Button';
import { JobRecordType, StateContainer, ValidRecordType } from '../../shared/types';
import { sendRequest } from "../../shared/utils";

interface JobFormProps {
  jobState: StateContainer<JobRecordType>,
  job: (JobRecordType & ValidRecordType) | undefined
}

function JobForm({ jobState, job }: JobFormProps) {
  const [disableForm, setDisableForm] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [allowDelete, setAllowDelete] = useState(false);
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

    const endpoint = '/jobs' + (job ? `/${job.id}` : '');
    const callback = (jobRecord: (JobRecordType & ValidRecordType)) => {
      job ? jobState.update(jobRecord) : jobState.add(jobRecord);
      setModal();
    };
    const catchCallback = (errors: string[]) => {
      setDisableForm(false);
      setWarnings(errors);
    };
    setDisableForm(true);
    sendRequest<JobRecordType & ValidRecordType>({endpoint, callback, catchCallback, options})
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobData(currentJobData => Object.assign({
      ...currentJobData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleAllowDelete = (e: ChangeEvent<HTMLInputElement>) => {
    setAllowDelete(e.target.checked);
  };

  const handleDelete = () => {
    if (!job) return null;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    };
    const endpoint = `/jobs/${job.id}`;
    const callback = () => {
      jobState.delete(job);
      setModal();
    }
    const catchCallback = (errors: string[]) => {
      setDisableForm(false);
      setWarnings(errors);
    };
    setDisableForm(true);
    sendRequest<null>({endpoint, callback, catchCallback, options})
  };

  const statusOptions = ['applying', 'pending', 'interviewing', 'offered', 'rejected'];
  
  const deleteInput = (
    <>
      <Input inputProps={{name: 'delete', type:'checkbox', checked: allowDelete, onChange: handleAllowDelete}} />
      <Button buttonProps={{type: 'button', disabled: !allowDelete, onClick: handleDelete}}>Delete</Button>
    </>
  );

  return (
    <form onSubmit={handleFormSubmit}>
      {job ? "Edit Job" : "Add a Job" }
      <Fieldset fieldsetProps={{disabled: disableForm}}>
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
        {job ? deleteInput : null}
      </Fieldset>
      {warnings.map(warning => <div key={warning}>{warning}</div>)}
    </form>
  );
}

export default JobForm;