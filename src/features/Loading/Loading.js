import loader from '../../assets/loader.svg';
import './LoadingStyle.css';

const Loading = () => {
    return(
        <div className='loader'>
            <img src={loader} alt="loading" width='55' />
            <h3>Loading...Please Wait!</h3>
        </div>

    )
}

export default Loading;