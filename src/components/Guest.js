import {Outlet, Navigate} from "react-router-dom";

const Guest = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return !user ? <Outlet /> : <Navigate to='/todos' />
}

export default Guest;