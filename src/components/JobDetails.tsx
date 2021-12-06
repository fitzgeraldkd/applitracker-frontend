import { useNavigate, useParams } from "react-router-dom";
import CommunicationTable from "./CommunicationTable";
import { CommunicationRecordType, JobRecordType, StateContainer } from "../shared/types";


interface JobDetailsProps {
  jobState: StateContainer<JobRecordType>,
  communicationState: StateContainer<CommunicationRecordType>
};

function JobDetails({ jobState, communicationState}: JobDetailsProps) {
  const params = useParams();
  const navigate = useNavigate();
  const job = jobState.records.find(record => record.id === parseInt(params.id!))
  
  if (!job) {
    navigate('/');
    return <></>;
  }
  
  return (
    <>
      <h3>{job.company}</h3>
      <h4>{job.position}</h4>
      {/* <h5>Communications:</h5> */}
      <CommunicationTable jobState={jobState} communicationState={communicationState} />
    </>
  );
}

export default JobDetails;