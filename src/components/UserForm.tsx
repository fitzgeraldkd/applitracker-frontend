import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fieldset from "./form/Fieldset";
import Input from './form/Input';
import Button from './common/Button';

// TODO: these props will probably not be needed once auth added
interface UserFormProps {
 [key: string]: any
};

function UserForm({ username, handleUsernameUpdate }: UserFormProps) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });

  const [message] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  const setLoggedInUser = (data: any) => {
    handleUsernameUpdate(data.user.username);
    localStorage.setItem('jwt', data.jwt);
    navigate('/');
  };

  const handleUserLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password
      })
    };

    setDisableForm(true);

    fetch(`${process.env.REACT_APP_API_URL}/login`, options)
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json()
      })
      .then(data => {
        setLoggedInUser(data);
      }).catch(error => {
        console.log(error);
        setDisableForm(false);
      });
  };

  const handleUserCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
        password_confirmation: loginData.passwordConfirm
      })
    };

    setDisableForm(true);

    fetch(`${process.env.REACT_APP_API_URL}/users`, options)
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      }).then(data => {
        setLoggedInUser(data);
      }).catch(error => {
        console.log(error);
        setDisableForm(false);
      });
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData(currentLoginData => Object.assign({...currentLoginData, [e.target.name]: e.target.value}))
  };

  return (
    <>
      <form onSubmit={newUser ? handleUserCreate : handleUserLogin}>
        <Fieldset fieldsetProps={{disabled: disableForm}}>
          <Input label='Username:' inputProps={{name: 'username', value: loginData.username, onChange: handleFormChange}} />
          <Input label='Password:' inputProps={{type: 'password', name: 'password', value: loginData.password, onChange: handleFormChange}} />
          {newUser && <Input label='Confirm:' inputProps={{type: 'password', name: 'passwordConfirm', value: loginData.passwordConfirm, onChange: handleFormChange}} />}
          <span></span>
          <Button buttonProps={{type: 'submit'}}>{newUser ? 'Create Account' : 'Log In'}</Button>
        </Fieldset>
      </form>
      <span>{message}</span>
      {newUser ? <Button buttonProps={{onClick:() => setNewUser(false)}}>Have an account?</Button> : <Button buttonProps={{onClick:() => setNewUser(true)}}>Need an account?</Button>}
    </>
  );
}

export default UserForm;