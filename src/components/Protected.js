import {Outlet, Navigate} from "react-router-dom";

const Protected = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return !!user ? <Outlet /> : <Navigate to='/auth/sign-in' />
}

export default Protected;