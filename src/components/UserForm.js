import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Fieldset from "./form/Fieldset";
import Input from './form/Input';
import Button from './common/Button';

function UserForm({ userId, handleUserIdUpdate }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const { status } = useAuth(userId);
  const [message, setMessage] = useState();
  const [newUser, setNewUser] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') navigate('/');
  }, [status, navigate]);

  const resetLoginData = () => {
    setLoginData({username: '', password: '', passwordConfirm: ''})
  };

  const setLoggedInUser = (data) => {
    localStorage.setItem('login_token', data.login_token);
    localStorage.setItem('user_id', data.user_id);
    handleUserIdUpdate(data.user_id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    };
    setDisableForm(true);
    fetch('http://localhost:9292/users/login', options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          resetLoginData();
          setMessage('Successfully logged in!');
          setLoggedInUser(data);
          // navigate('/');
        } else {
          setMessage('Invalid login credentials.');
          setDisableForm(false);
        }
      });
  };


  const handleFormChange = (e) => {
    setLoginData(currentLoginData => Object.assign({...currentLoginData, [e.target.name]: e.target.value}))
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Fieldset columns={2} disabled={disableForm}>
          <Input name='username' label='Username:' value={loginData.username} onChange={handleFormChange} />
          <Input type='password' name='password' label='Password:' value={loginData.password} onChange={handleFormChange} />
          {newUser && <Input type='password' name='passwordConfirm' label='Confirm:' value={loginData.passwordConfirm} onChange={handleFormChange} />}
          <span></span>
          <Button type='submit'>Submit</Button>
        </Fieldset>
      </form>
      {newUser ? <Button onClick={() => setNewUser(false)}>Have an account?</Button> : <Button onClick={() => setNewUser(true)}>Need an account?</Button>}
    </>
  );
}

export default UserForm;