import PropTypes from "prop-types";
import {useRef, useState} from "react";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import TodosService from "../../../services/todosService";
import $ from 'jquery';

const DeleteModal = ({ id, todo, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigateTo = useNavigate();
  const modalRef = useRef();

  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await TodosService.deleteTodo(todo.id)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      onDelete(response.data.data)
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

  return (
    <div className="modal fade" id={id} tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Todo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div>
              Are you sure you want to delete this Todo?
            </div>
          </div>
          <div className="modal-footer">
            <button disabled={loading} type="button" className="btn btn-danger btn-block" onClick={handleDelete}>
              { loading ? 'Deleting...' : 'Delete' }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTupes = {
  id: PropTypes.string.isRequired
}

export default DeleteModal;