import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Fieldset from "./form/Fieldset";
import Input from './form/Input';
import Button from './common/Button';

// TODO: these props will probably not be needed once auth added
interface UserFormProps {
 [key: string]: any
};

function UserForm({ userId, handleUserIdUpdate }: UserFormProps) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const { status } = useAuth(userId);
  const [message, setMessage] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') navigate('/');
  }, [status, navigate]);

  const resetLoginData = () => {
    setLoginData({username: '', password: '', passwordConfirm: ''})
  };

  const setLoggedInUser = (data: any) => {
    localStorage.setItem('login_token', data.login_token);
    localStorage.setItem('user_id', data.user_id);
    handleUserIdUpdate(data.user_id);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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


  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData(currentLoginData => Object.assign({...currentLoginData, [e.target.name]: e.target.value}))
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Fieldset fieldsetProps={{disabled: disableForm}}>
          <Input label='Username:' inputProps={{name: 'username', value: loginData.username, onChange: handleFormChange}} />
          <Input label='Password:' inputProps={{type: 'password', name: 'password', value: loginData.password, onChange: handleFormChange}} />
          {newUser && <Input label='Confirm:' inputProps={{type: 'password', name: 'passwordConfirm', value: loginData.passwordConfirm, onChange: handleFormChange}} />}
          <span></span>
          <Button buttonProps={{type: 'submit'}}>Submit</Button>
        </Fieldset>
      </form>
      <span>{message}</span>
      {newUser ? <Button buttonProps={{onClick:() => setNewUser(false)}}>Have an account?</Button> : <Button buttonProps={{onClick:() => setNewUser(true)}}>Need an account?</Button>}
    </>
  );
}

export default UserForm;