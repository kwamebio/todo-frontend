import { useSnackbar } from 'notistack';

const CloseSnackBar = () => {
  const { closeSnackbar } = useSnackbar();
  return (
    <button className="btn btn-sm btn-light" onClick={() => closeSnackbar()}>Dismiss</button>
  )
}

export default CloseSnackBar;