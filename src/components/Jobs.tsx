import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import JobTable from './JobTable';
import Button from './common/Button';
import { ModalContext } from '../context/modal';
import { JobRecordType, StateContainer } from '../shared/types';

// TODO: userId probably not needed
interface BodyProps {
  jobState: StateContainer<JobRecordType>,
  username: string | undefined
};

function Body({ jobState, username }: BodyProps) {
  // const { status } = useAuth(userId);
  const { setModal } = useContext(ModalContext);
  // const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // TODO: implement authorization/authentication
  //   // if (status === 'rejected') navigate('/login');
  // }, [status, navigate]);

  // useEffect(() => {
  //   // if (status === 'success') {
  //     fetch(`${process.env.REACT_APP_API_URL}/jobs?user_id=${userId}&login_token=${localStorage.getItem('login_token')}`)
  //       .then(response => response.json())
  //       .then(job => setJobs(job));
  //   // }
  // }, [status, userId])
  if (!username) return <>You must be logged in.</>;

  return (
    <>
      <Button buttonProps={{onClick: () => setModal({modal: 'job'})}}>Add Job</Button>
      <JobTable jobState={jobState} />
    </>
  )
}

export default Body;