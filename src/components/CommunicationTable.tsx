import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { ModalContext } from '../context/modal';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Button from './common/Button';
import IconLink from './common/IconLink';
import { CommunicationRecordType, JobRecordType, StateContainer } from "../shared/types";

interface CommunicationTableProps {
  jobState: StateContainer<JobRecordType>,
  communicationState: StateContainer<CommunicationRecordType>
};

function CommunicationTable({ jobState, communicationState }: CommunicationTableProps) {
  const params = useParams();
  const { setModal } = useContext(ModalContext);
  const [expandedCommId, setExpandedCommId] = useState<number>()

  const communications = communicationState.records
    .filter(communication => communication.job_id === parseInt(params.id!))
    .sort((a, b) => {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      return 0;
    })
    .map(communication => (
      <React.Fragment key={communication.id}>
        <span>
          {communication.id === expandedCommId ? 
            <IconLink iconLinkProps={{onClick: () => setExpandedCommId(undefined)}}><ExpandLessIcon /></IconLink> : 
            <IconLink iconLinkProps={{onClick: () => setExpandedCommId(communication.id)}}><ExpandMoreIcon /></IconLink>}
          {/* <IconLink>{communication.id === expandedCommId ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconLink> */}
        </span>
        {/* <span><IconLink tooltip={{position: 'right', text: 'Edit'}} iconLinkProps={{onClick: () => setModal({modal: 'communication', record: communication})}}><EditIcon /></IconLink></span> */}
        <span>{communication.heading}</span>
        {/* <span>{communication.description}</span> */}
        <span>{new Date(communication.time).toLocaleString().replace(/:\d\d\s/, ' ')}</span>
        <span>{communication.received ? <CallReceivedIcon /> : <CallMadeIcon />}</span>
        <span>{communication.contact === '' ? 'Unknown' : communication.contact}</span>
        {communication.id === expandedCommId && 
          <>
          <IconLink tooltip={{position: 'right', text: 'Edit'}} iconLinkProps={{onClick: () => setModal({modal: 'communication', record: communication})}}><EditIcon /></IconLink>
          <span className='comm-description'>
            {communication.description === '' ? 'No description.' : communication.description}
          </span>
          </>}
      </React.Fragment>
    ));

  if (communications.length === 0) {
    return (
      <>
        <Button buttonProps={{onClick: () => setModal({modal: 'communication'})}}>Add Communication</Button>
        <div>No communications added for this job.</div>
      </>
    );
  } 

  return (
    <>
      <Button buttonProps={{onClick: () => setModal({modal: 'communication'})}}>Add Communication</Button>
      <CommunicationContainer>
        <span className='header'></span>
        <span className='header'>Heading</span>
        <span className='header'>Date</span>
        <span className='header'></span>
        <span className='header'>Contact</span>
        { communications }

      </CommunicationContainer>
    </>
  );
}

export default CommunicationTable;

const CommunicationContainer = styled.div`
  display: grid;
  grid-template-columns: 24px auto auto 24px auto;
  margin-top: 10px;

  .header {
    font-weight: bold;
  }

  .comm-description {
    grid-column: 2 / 6;
    /* padding-left: 24px; */
  }
`;