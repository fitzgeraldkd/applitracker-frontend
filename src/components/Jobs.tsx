import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import JobTable from './JobTable';
import Button from './common/Button';
import { ModalContext } from '../context/modal';
import { JobRecordType, StateContainer } from '../shared/types';

interface BodyProps {
  jobState: StateContainer<JobRecordType>,
  username: string | undefined
};

function Body({ jobState, username }: BodyProps) {
  const { setModal } = useContext(ModalContext);
  // const navigate = useNavigate();

  if (!username) return <>You must be <Link className='text-link' to='/login'>logged in</Link> to interact with job listings.</>;

  return (
    <>
      <Button buttonProps={{onClick: () => setModal({modal: 'job'})}}>Add Job</Button>
      <JobTable jobState={jobState} />
    </>
  )
}

export default Body;