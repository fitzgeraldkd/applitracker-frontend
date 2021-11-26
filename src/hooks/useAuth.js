import { useEffect, useState } from 'react';

function useAuth(userId) {
  const [status, setStatus] = useState('idle');
  const [username, setUsername] = useState('');

  const loginToken = localStorage.getItem('login_token');
  // const userId = localStorage.getItem('user_id');

  useEffect(() => {
    setStatus('pending');
    if (userId === null || loginToken === null) {
      setStatus('rejected');
    } else {
      console.log(`${process.env.REACT_APP_API_URL}`)
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}?login_token=${loginToken}`)
        .then(resp => resp.json())
        .then(data => {
          if (data.success) {
            setStatus('success');
            setUsername(data.username);
          } else {
            setStatus('rejected');
          }
        })
        .catch(err => {
          console.error(err);
          setStatus('rejected');
        })
    }
  }, [loginToken, userId]);

  return {status, username};
}

export default useAuth;