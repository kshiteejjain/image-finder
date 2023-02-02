import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImages, selectedImage, removeImage } from './ProfilePicSlice';
import { useNavigate } from "react-router-dom";

import './ProfilePic.css';



const ProfilePic = () => {
    const dispatch = useDispatch();
    const { images } = useSelector((state) => state.imageList);
    const users = useSelector(store => store.users);
    const navigate = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem('topic') !== users[0]?.topic && localStorage.getItem('topic') !== users[0]?.otherTopic) || images.length < 1) {
            dispatch(getImages())
        }
    }, [])

    const getCurrentImage = (e) => {
        dispatch(selectedImage(e))
        navigate("/UserCard");
    }

    const handleRemove = (id) => {
        dispatch(removeImage(id))
    };

    const newCard = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <>
        {images?.length < 1 && users.length < 1 ? <div className='emptyStateProfile'> <h2>Whoops..! </h2> <p>Your settings are reset due to page refresh, please click below to create new user card.</p> <span onClick={newCard} className='buttonPrimary'>Make New Card</span></div> : <h2>Please Select one image for your profile </h2>}
            {images?.map((img, i) => {
                return (
                    <div className='imageContainer' key={i}>
                        <img src={img} className='profilePic' alt='profile' />
                        <div className='buttonContainer'>
                            <button className='acceptButton' onClick={() => getCurrentImage(img)}>Accept</button>
                            <button className='rejectButton' onClick={() => handleRemove(img)}>Reject</button>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default ProfilePic;