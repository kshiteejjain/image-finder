import { useSelector } from "react-redux";
import {Link } from "react-router-dom";
import ProfilePic from "../ProfilePic/ProfilePic";
import './UserCard.css';

const UserCard = () => {
    const users = useSelector(store => store.users);

    return (
        <div>
            <h1>User Card</h1>
            {users?.map((e, i) => {
                return (
                    <div className="card" key={i}>
                        <div className="cardImage"> 
                            <ProfilePic />
                        </div>
                        <label>Name: <span>{e.userName}</span></label> 
                        <label>Surname: <span> {e.surname}</span></label> 
                        <label>Topic: <span>{e.topic}</span></label> 
                        <label>Other Topic: <span>{e.otherTopic}</span></label> 
                    </div>
                )
            })}
<Link to="/" className='buttonPrimary'>Make Another Card</Link>
        </div>
    )
}

export default UserCard;