import './LoadingSpinner.css';
import { ColorRing } from 'react-loader-spinner';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
  };

function LoadingSpinner() {
    

  return (
    <div className="loading-spinner">
        <ColorRing
            height="50"
            width="50"
            radius="5"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#f94f64', '#f94f64', '#f94f64', '#f94f64', '#f94f64']}
        />
    </div>
  );
}

export default LoadingSpinner;