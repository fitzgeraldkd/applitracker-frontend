// import { useNavigate } from "react-router-dom";

export const logout = (handleUsernameUpdate: Function) => {
  localStorage.removeItem('jwt');
  // const navigate = useNavigate();
  // navigate('/login');
  // window.location.pathname = ('/login')
  handleUsernameUpdate()
};