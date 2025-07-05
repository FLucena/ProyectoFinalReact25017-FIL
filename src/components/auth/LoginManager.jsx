import { LazyLogin } from '../LazyComponents';

const LoginManager = ({ isLoginOpen, closeLogin }) => (
  isLoginOpen ? <LazyLogin closeLogin={closeLogin} /> : null
);

export default LoginManager; 