import './Logo.css';

function Logo () {
    return (
        <div className="vertical-container">
          <img
            className="logo"
            src="/images/signup_logo.png"
            alt="Logo"
          />
          <h1 className="title" style={{ fontFamily: 'Inter, sans-serif' }}>Join and support your favorite content creators <br/>today.</h1>
        </div>
    );
}

export default Logo;