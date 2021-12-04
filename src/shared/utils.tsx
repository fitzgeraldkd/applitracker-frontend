// import { useNavigate } from "react-router-dom";

export const logout = (handleUsernameUpdate: Function) => {
  localStorage.removeItem('jwt');
  // const navigate = useNavigate();
  // navigate('/login');
  // window.location.pathname = ('/login')
  handleUsernameUpdate()
};

interface SendRequestParams {
  endpoint: string,
  callback?: Function,
  catchCallback?: Function,
  options?: RequestInit | undefined
}

export const sendRequest = async <T, >({endpoint, callback=() => {}, catchCallback=() => {}, options}: SendRequestParams) => {
  // TODO: automatically add JWT to headers if exists
  const resp = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, options);
  if (resp.statusText === 'No Content') {
    callback()
  } else {
    const data: T | {errors: string[]} = await resp.json();
    console.log(data);
    if (resp.ok) {
      callback(data as T);
    } else if (data && 'errors' in data) {
      data.errors.forEach(error => console.warn(error));
      catchCallback(data.errors);
    } else {
      console.error('Payload from backend does not match expected results.')
      console.error(data);
    }
  }
};