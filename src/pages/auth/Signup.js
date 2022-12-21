import AuthLayout from "./AuthLayout";
import {Link} from "react-router-dom";
import {Fragment, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import AuthService from "../../services/authService";
import {useSnackbar} from "notistack";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigateTo = useNavigate();

  const TITLE = 'Sign Up'
  const SUBTITLE = 'Sign up and create todos'

  const schema = yup.object({
    email: yup.string().email().required().nullable(),
    first_name: yup.string().required().nullable(),
    last_name: yup.string().required().nullable(),
    password: yup.string().required().min(6),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const Footer = () => {
    return (
      <Fragment>Existing user, <Link to="/auth/sign-in" className="text-green">Sign in</Link></Fragment>
    )
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await AuthService.signUp(data)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      navigateTo('/auth/sign-in')
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title={TITLE} subtitle={SUBTITLE} footer={<Footer />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 mt-3">
          <label htmlFor="first_name" className="form-label font-size-14">First Name</label>
          <input
            type="text"
            className="form-control font-size-14"
            id="first_name"
            placeholder="Enter first name"
            {...register('first_name')} />
          <small className="text-danger">{errors.first_name?.message}</small>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="last_name" className="form-label font-size-14">Last Name</label>
          <input
            type="text"
            className="form-control font-size-14"
            id="last_name"
            placeholder="Enter last name"
            {...register('last_name')} />
          <small className="text-danger">{errors.last_name?.message}</small>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label font-size-14">Email</label>
          <input
            type="email"
            className="form-control font-size-14"
            id="email"
            placeholder="Enter email"
            {...register('email')} />
          <small className="text-danger">{errors.email?.message}</small>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label font-size-14">Password</label>
          <input
            type="password"
            className="form-control font-size-14"
            id="pwd"
            placeholder="Enter password"
            {...register('password')} />
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

export default Signup;