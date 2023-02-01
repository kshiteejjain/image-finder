import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImages, selectedImage, removeImage } from './ProfilePicSlice';
import { useNavigate } from "react-router-dom";

import './ProfilePic.css';


const ProfilePic = () => {
    const dispatch = useDispatch();
    const { images, loading } = useSelector((state) => state.imageList);
    const users = useSelector(store => store.users);
    const navigate = useNavigate();

    useEffect(() => {
        if((localStorage.getItem('topic') !== users[0].topic && localStorage.getItem('topic') !== users[0].otherTopic) || images.length < 1){
            dispatch(getImages())
        }
        window.onbeforeunload = function(event) {
            console.log('Page Refreshed');
            navigate("/");
          };
    }, [dispatch])

    const getCurrentImage = (e) => {
        dispatch(selectedImage(e))
        console.log(dispatch(selectedImage(e)))
        navigate("/UserCard");
    }

    const handleRemove = (id) => {
        dispatch(removeImage(id))
        console.log( dispatch(removeImage(id)))
    };

    return (
        <>

            <h2>Please Select one image for your profile </h2>
            {loading ? 'Loading Images' :
                <div> {images?.map((item, i) => {
                    return (
                        // <img key={i} src={item.results[0].urls.full} width='100' height='100' />
                        item.results?.map((img, i, id) => {
                            return (
                                <div className='imageContainer' key={i}>
                                    <img src={img.urls.small} className='profilePic' alt='profile' />
                                    <div className='buttonContainer'>
                                        <button className='buttonPrimary' onClick={() => getCurrentImage(img.urls.small)}>Accept</button>
                                        <button className='buttonPrimary' onClick={() => handleRemove(id)}>Reject</button>
                                    </div>
                                </div>
                            )
                        })
                    )
                })}
                </div>
            }

        </>
    )
};

export default ProfilePic;