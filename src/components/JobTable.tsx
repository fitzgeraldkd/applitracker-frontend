import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { JobRecordType } from '../shared/types';

interface JobTableProps {
  jobs: JobRecordType[]
};

function JobTable({ jobs }: JobTableProps) {


  return (
    <Table>
      <span className='header'></span>
      <span className='header'>Company</span>
      <span className='header'>Position</span>
      <span className='header'>Status</span>
      {jobs.map(job => (
        <React.Fragment key={job.id}>
          <span>{job.favorite ? <StarIcon /> : <StarBorderIcon />}</span>
          <span>{job.company}</span>
          <span>{job.position}</span>
          <span>{job.status}</span>
        </React.Fragment>
      ))}
    </Table>
  );
}

export default JobTable;

const Table = styled.div`
  display: grid;
  grid-template-columns: 24px auto auto auto;

  .header {
    font-weight: bold;
  }
`;