import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getImages } from './ProfilePicSlice';
import {Link} from "react-router-dom";


const ProfilePic = ({data}) => {
    const dispatch = useDispatch();
    const {images, loading} = useSelector((state) => state.imageList);

 useEffect(() =>  {
    dispatch(getImages())
    
 },[])

    return (
        <>

        <h2>Please Select one image for your profile </h2>
            {images?.map((item, i)=> {
                return(
                    // <img key={i} src={item.results[0].urls.full} width='100' height='100' />
                    item.results?.map((img, i)=> {
                        return(
                            <img key={i} src={img.urls.regular} className='profilePic' />
                        )
                    })
                )
            })}
            <Link to="/UserCard" className='buttonPrimary'>Next</Link>
        </>
    )
};

export default ProfilePic;