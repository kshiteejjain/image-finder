import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './UserCard.css';

const UserCard = () => {
    const [currentImage, setCurrentImage] = useState([]);
    const users = useSelector(store => store.users);
    const navigate = useNavigate();
    const { selectedImage } = useSelector(state => ({
        selectedImage: state.imageList.selectedImage,
    }));

    useEffect(() => {
        setCurrentImage(selectedImage)
    }, []);

    const newCard = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <div className='cardWrapper'>
            <h1>User Card</h1>
            <div className='cardParent'>
                {users?.map((e, i) => {
                    return (
                        <div className='card' key={i}>
                            <div className='cardImage'>
                                <img alt='Profile' src={currentImage} className='profilePic' />
                            </div>
                            <label>Name: <span>{e.userName}</span></label>
                            <label>Surname: <span> {e.surname}</span></label>
                            {e.topic !== 'Other' ? <label>Topic: <span>{e.topic}</span></label> : null}
                            {e.otherTopic !== '' ? <label>Topic: <span>{e.otherTopic}</span></label> : null}
                        </div>
                    )
                })}
            </div>
            <p onClick={newCard} className='buttonPrimary'>Make New Card</p>
        </div>
    )
}

export default UserCard;