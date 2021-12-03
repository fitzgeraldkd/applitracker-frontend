import React, { useContext } from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import { JobRecordType, StateContainer, ValidRecordType } from '../shared/types';
import { ModalContext } from '../context/modal';
import IconLink from './common/IconLink';

interface JobTableProps {
  jobState: StateContainer<JobRecordType>
};

function JobTable({ jobState }: JobTableProps) {
  const { setModal } = useContext(ModalContext);
  // console.log(jobs);
  const handleFavoriteClick = (job: JobRecordType & ValidRecordType) => {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({favorite: !job.favorite})
    };

    fetch(`${process.env.REACT_APP_API_URL}/jobs/${job.id}`, options)
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      }).then(data => {
        jobState.update(data);
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <Table>
      <span className='header'></span>
      <span className='header'></span>
      <span className='header'>Company</span>
      <span className='header'>Position</span>
      <span className='header'>Status</span>
      {jobState.records.map(job => (
        <React.Fragment key={job.id}>
          <span><IconLink iconLinkProps={{onClick: () => handleFavoriteClick(job)}}>{job.favorite ? <StarIcon /> : <StarBorderIcon />}</IconLink></span>
          <span><IconLink iconLinkProps={{onClick: () => setModal({modal: 'job', record: job})}}><EditIcon /></IconLink></span>
          <span>{job.company}</span>
          <span>{job.position}</span>
          <span>{job.status.replace(/./, job.status[0].toUpperCase())}</span>
        </React.Fragment>
      ))}
    </Table>
  );
}

export default JobTable;

const Table = styled.div`
  display: grid;
  grid-template-columns: 24px 24px auto auto auto;

  .header {
    font-weight: bold;
  }
`;