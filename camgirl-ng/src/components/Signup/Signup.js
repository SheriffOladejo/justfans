import './Signup.css';
import Logo from '../Logo/Logo';
import Login from '../Login/Login';
import SignupSection from '../Signup/SignupSection';

function Signup () {
    return (
      <div className='signup-row'>
        <div className="container">
          <div className='overlay'></div>
          <img src="/images/logo_small.png" className='login-logo-small' />
          <div>
            <img src="/images/logo_big.png" className='login-logo-big' />
          </div>
        </div>
        <Login/>
      </div>
    );
}

export default Signup;