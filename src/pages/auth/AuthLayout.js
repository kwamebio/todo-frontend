import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const AuthLayout = ({ title, subtitle, footer, children }) => {
  return (
    <div className="container Auth">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="Auth-card card">
          <div className="card-body">
            <h4 className="text-green text-center">{ title }</h4>
            <div className="text-muted small text-center">{ subtitle }</div>
            <hr />

            { children }
          </div>
          <div className="card-footer text-end font-size-14">
            { footer }
          </div>
        </div>
      </div>
    </div>
  )
};

AuthLayout.defaultProps = {
  footer: null
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  footer: PropTypes.node
}

export default AuthLayout;