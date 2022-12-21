import {useState, useEffect, Fragment} from "react";

import EmptyImage from '../../assets/images/empty.svg'
import dayjs  from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TodoModal from "./modals/TodoModal";
import DeleteModal from "./modals/DeleteModal";
import AuthService from "../../services/authService";
import TodosService from "../../services/todosService";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {removeItem, updateArray} from "../../services/arrayService";
dayjs.extend(relativeTime)

const Todos = () => {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])
  const [deleteTodo, setDeleteTodo] = useState(null)
  const [action, setAction] = useState(null);
  const [todo, setTodo] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const navigateTo = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const actionAdd = () => {
    setAction('Add');
    setTodo(null)
  }
  const actionEdit = (todo) => {
    setAction('Edit');
    setTodo(todo)
  }

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await TodosService.listTodos()
      setTodos(response.data.data)
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
      if (e.message.includes('Token')) logout()
    } finally {
      setLoading(false)
    }
  }

  const updateTodos = (data) => {
    const oldTodos = [...todos]
    setTodos(updateArray(oldTodos, data))
  }

  const removeTodo = (data) => {
    const oldTodos = [...todos]
    setTodos(removeItem(oldTodos, data))
  }

  const logout = () => {
    localStorage.removeItem('user');
    navigateTo('/auth/sign-in')
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const badges = {
    pending: 'bg-warning',
    cancelled: 'bg-danger',
    done: 'bg-success'
  }

  return (
    <div className="container Todo">
      <div className="card my-4">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4>Welcome { user.first_name } 🎉</h4>
            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          {
            loading ?
              <div>Loading...</div> :
              <Fragment>
                <div className="card-header d-flex justify-content-between bg-white mb-5">
                  <h5>Manage your Todos</h5>
                  <button className="btn btn-green btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#todoModal"
                          onClick={actionAdd}>Add Todo</button>
                </div>
                {
                  todos.length > 0 &&
                  <ul className="list-group">
                    {
                      todos.map((todo) => {
                        return (
                          <li className="list-group-item">
                            <div className="d-flex flex-wrap">
                              <div className="flex-grow-1">{todo.name}</div>
                              <div>
                                <button
                                  type={'button'}
                                  className="btn btn-light btn-sm me-2 font-size-14"
                                  data-bs-toggle="modal"
                                  data-bs-target="#todoModal"
                                  onClick={() => actionEdit(todo)}>Edit</button>
                                <button
                                  type='button'
                                  className="btn btn-danger btn-sm font-size-14"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteModal"
                                  onClick={() => setDeleteTodo(todo)}>Delete</button>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className={`badge ${badges[todo.status]} me-2`}>{todo.status}</div>
                              <div className="text-muted font-size-14">{dayjs(todo.created_at).fromNow()}</div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                }
                {
                  todos.length <= 0 &&
                  <div className="text-center pt-4">
                    <h5 className="mb-3">No Todos</h5>
                    <img className="img-fluid" src={EmptyImage} alt="Empty" />
                  </div>
                }
              </Fragment>
          }
        </div>
      </div>
      <TodoModal action={action} id="todoModal" todo={todo} onDone={updateTodos} />
      <DeleteModal id="deleteModal" todo={deleteTodo} onDelete={removeTodo} />
    </div>
  );
}

export default Todos;