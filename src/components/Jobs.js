import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import JobTable from './JobTable';

function Body({ userId, jobState }) {
  const { status } = useAuth(userId);
  // const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: implement authorization/authentication
    // if (status === 'rejected') navigate('/login');
  }, [status, navigate]);

  // useEffect(() => {
  //   // if (status === 'success') {
  //     fetch(`${process.env.REACT_APP_API_URL}/jobs?user_id=${userId}&login_token=${localStorage.getItem('login_token')}`)
  //       .then(response => response.json())
  //       .then(job => setJobs(job));
  //   // }
  // }, [status, userId])

  return (
    <>
      Home
      <JobTable jobs={jobState.records} />
    </>
  )
}

export default Body;