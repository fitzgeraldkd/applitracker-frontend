import styled from 'styled-components';

function Help() {

  return (
    <HelpContainer>
      <h3>Welcome to AppliTracker!</h3>
      After creating an account/signing in, you can add jobs you've applied to and see them displayed in a list with their statuses. As you move forward with the application/interview process, you can update the jobs as appropriate to help stay organized.
      <br /><br />
      On the events page, you can add different events that you want to keep track of when upcoming interviews are or when an application deadline is due. Each event is tied to a job you have listed.
      <br /><br />
      If you want to see how I built this app, here are the associated repositories on GitHub:
      <br /><br />
      <a href='https://github.com/fitzgeraldkd/applitracker-frontend' className='text-link' target='_blank' rel='noreferrer'>Frontend</a>
       | 
      <a href='https://github.com/fitzgeraldkd/applitracker-backend' className='text-link' target='_blank' rel='noreferrer'>Backend</a>
    </HelpContainer>
  );
}

export default Help;

const HelpContainer = styled.div`
  max-width: 600px;

  h3 {
    text-align: center;
  }
`;