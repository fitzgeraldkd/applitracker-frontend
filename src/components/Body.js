import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import JobTable from './JobTable';

function Body({ userId }) {
  const { status } = useAuth(userId);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(status);
    if (status === 'rejected') navigate('/login');
  }, [status, navigate]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/applications?user_id=${userId}&login_token=${localStorage.getItem('login_token')}`)
      .then(response => response.json())
      .then(job => setJobs(job));
  }, [userId])

  return (
    <>
      Home
      <JobTable jobs={jobs} />
    </>
  )
}

export default Body;