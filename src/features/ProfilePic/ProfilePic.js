import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImages, selectedImage, removeImage } from './ProfilePicSlice';
import { useNavigate } from "react-router-dom";
// import Loading from '../Loading/Loading';

import './ProfilePic.css';



const ProfilePic = () => {
    const dispatch = useDispatch();
    const { images, loading } = useSelector((state) => state.imageList);
    const activeImage  = useSelector((state) => state.imageList.selectedImage);
    const users = useSelector(store => store.users);
    const navigate = useNavigate();
    let pageId = 0;

    useEffect(() => {
        if ((localStorage.getItem('topic') !== users.slice(-1)[0]?.topic && localStorage.getItem('topic') !== users.slice(-1)[0]?.otherTopic) || images.length < 1) {
            dispatch(getImages(pageId));
            pageId += 1;
         }
       // dispatch(getImages())
    }, [images])

    const getCurrentImage = (e) => {
        dispatch(selectedImage(e))
    }

    const handleNext = () => {
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
            {images?.length < 1 && users.length < 1 ? <div className='emptyStateProfile'> <h2>Whoops..! </h2> <p>Your settings are reset due to page refresh, please click below to create new user card.</p> <span onClick={newCard} className='buttonPrimary'>Make New Card</span></div> : null}
            {loading ? null :  <div>
            <h2>Please Select one image for your profile </h2>
                <div className='imageWrapper'>
                {images?.map((img, i) => {
                    console.log(activeImage, img)
                    return (
                        <div className={activeImage?.includes(img) ?  'active imageContainer' : 'imageContainer'}  key={i}>
                            <img src={img} className='profilePic' alt='profile' />
                            <div className='buttonContainer'>
                                <button className='acceptButton' onClick={() => getCurrentImage(img)}>Accept</button>
                                <button className='rejectButton' onClick={() => handleRemove(img)}>Reject</button>
                            </div>
                        </div>
                    );
                })}
            </div><p className='buttonPrimary' onClick={handleNext}> Next </p></div>}
        </>
    )
};

export default ProfilePic;