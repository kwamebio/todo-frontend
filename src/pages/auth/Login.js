import AuthLayout from "./AuthLayout";
import {Link, useNavigate} from "react-router-dom";
import {Fragment, useState} from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "../../services/authService";
import {useSnackbar} from "notistack";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigateTo = useNavigate();

  const TITLE = 'Sign In'
  const SUBTITLE = 'Sign in and manage your Todos'

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    try {
      setLoading(true)
      const response = await AuthService.login(data)
      localStorage.setItem('user', JSON.stringify(response.data.data));
      enqueueSnackbar(response.data.message, { variant: 'success' })
      navigateTo('/todos')
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const Footer = () => {
    return (
      <Fragment>New here, <Link to="/auth/sign-up" className="text-green">Sign up</Link></Fragment>
    )
  }

  return (
    <AuthLayout title={TITLE} subtitle={SUBTITLE} footer={<Footer />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label font-size-14">Email</label>
          <input
            type="email"
            className="form-control font-size-14"
            id="email"
            placeholder="Enter email"
            {...register("email")} />
          <small className="text-danger">{errors.email?.message}</small>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label font-size-14">Password</label>
          <input
            type="password"
            className="form-control font-size-14"
            id="pwd"
            placeholder="Enter password"
            {...register("password")} />
          <small className="text-danger">{errors.password?.message}</small>
        </div>
        <div className="d-grid">
          <button disabled={loading} type="submit" className="btn btn-green btn-block">
            { loading ? 'Submitting...' : 'Submit' }
          </button>
        </div>
      </form>
    </AuthLayout>
  )
};

export default Login;