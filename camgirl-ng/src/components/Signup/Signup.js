import './Signup.css';
import Logo from '../Logo/Logo';
import Login from '../Login/Login';
import SignupSection from '../Signup/SignupSection';

function Signup () {
    return (
        <div className="container">
          <div className="overlay"></div>
          <div className="content">
            <Logo/>
            <div className="separator"></div>
            <Login/>
          </div>
        </div>

    );
}

export default Signup;