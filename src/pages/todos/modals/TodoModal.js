import {useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TodosService from "../../../services/todosService";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
  name: yup.string().required(),
  status: yup.string().required(),
}).required();

const TodoModal = ({ id, action, todo, onDone }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const modalRef = useRef();

  const navigateTo = useNavigate();
  const { register, handleSubmit, setValue, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async data => {
    try {
      setLoading(true)
      const response = action === 'Add' ? await TodosService.addTodo(data) : await TodosService.editTodo(data, todo.id)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      onDone(response.data.data)
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
      if (e.message.includes('Token')) logout()
    } finally {
      setLoading(false)
      modalRef.current.classList.remove('show')
      document.querySelector('.modal-backdrop').classList.remove('show')
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    navigateTo('/auth/sign-in')
  }

  useEffect(() => {
    reset();
    setValue('name', todo?.name);
    setValue('status', todo?.status);
  }, [todo])

  return (
    <div className="modal fade" ref={modalRef} id={id} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{action} Todo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label font-size-14">Name</label>
                <input
                  type="text"
                  className="form-control font-size-14"
                  id="name"
                  placeholder="Todo Item"
                  {...register("name")} />
                <small className="text-danger">{errors.name?.message}</small>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label font-size-14">Status</label>
                <select className="form-control font-size-14" id="status" {...register("status")} >
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <small className="text-danger">{errors.status?.message}</small>
              </div>
              <div className="d-grid">
                <button disabled={loading} type="submit" className="btn btn-green btn-block">
                  { loading ? 'Submitting...' : 'Submit' }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

TodoModal.defaultProps = {
  todo: null
}

TodoModal.propTupes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  todo: PropTypes.any
}

export default TodoModal;